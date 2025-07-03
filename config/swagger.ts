type SwaggerData = {
  openapi: string;
  info: {
    title: string;
    version: string;
    description: string;
  };
  paths: Record<string, any>;
  components: {
    securitySchemes: {
      bearerAuth: {
        type: string;
        scheme: string;
        bearerFormat: string;
      };
    };
  };
};

const swaggerData: SwaggerData = {
  openapi: "3.0.0",
  info: {
    title: "Simple API with Authorization",
    version: "1.0.0",
    description: "This is a simple API documentation with authorization for login.",
  },
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

function convertPatternToPath(path: string): string {
  // Allow a-z, A-Z, 0-9, /, and -
  path = path.replace(/[^a-zA-Z0-9/:/-]+/g, "");
  // Replace colon-prefixed params (e.g., :id) with {id}
  path = path.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");
  // Remove leading and trailing slashes
  path = path.replace(/^\/|\/$/g, "");
  return path;
}

type Field = {
  route: string;
  method: string;
  tag?: string;
  authRequired?: boolean;
  params?: any;
  queryParams?: Array<{
    name: string;
    in: string;
    required?: boolean;
    description?: string;
    type?: string;
  }>;
};

type RouterLayer = {
  route?: {
    path: string;
    methods: { [method: string]: boolean };
  };
  handle?: any;
  regexp?: { source: string };
};

const generateSwaggerJSONFromRouter = (
  router: { stack: RouterLayer[] },
  fields: Field[],
  parentPath = ""
): SwaggerData => {
  const apiVersion = process.env.API_VERSION ? process.env.API_VERSION : "v1";
  const mainRoute = `/api/${apiVersion}/`;

  router.stack.forEach((layer) => {
    if (layer.route) {
      const path = convertPatternToPath(layer.route.path);
      let fullPath = parentPath + path;
      const methods = layer.route.methods;
      fullPath = mainRoute + fullPath;

      Object.keys(methods).forEach((method) => {
        swaggerData.paths[fullPath] = swaggerData.paths[fullPath] || {};
        let parameters: any = {};
        if (fields && fields.length > 0) {
          parameters = fields.find(
            (item) =>
              mainRoute + item.route === fullPath &&
              method.toLowerCase() == item.method.toLowerCase()
          );
        }
        let swaggerEntry: any = {
          summary: `${method.toUpperCase()} ${fullPath}`,
          description: `Generated dynamically for ${method.toUpperCase()} ${fullPath}`,
          tags: parameters && parameters.tag ? [parameters.tag] : ["default"],
          security:
            parameters && parameters.authRequired
              ? [
                  {
                    bearerAuth: [],
                  },
                ]
              : false,
          responses: {
            200: {
              description: "Successful operation",
            },
          },
        };

        if (
          parameters &&
          parameters.queryParams &&
          parameters.queryParams.length > 0
        ) {
          swaggerEntry.parameters = parameters.queryParams.map((param: any) => ({
            name: param.name,
            in: param.in,
            required: param.required || false,
            description: param.description || "",
            schema: {
              type: param.type || "string",
            },
          }));
        }

        if (method !== "get") {
          swaggerEntry["requestBody"] = {
            required: true,
            content: {
              "application/json": {
                example: parameters && parameters.params ? parameters.params : {},
              },
            },
          };
        }
        swaggerData.paths[fullPath][method] = swaggerEntry;
      });
    } else if (layer.handle && layer.handle.stack) {
      // Layer is a nested router
      const nestedRouter = layer.handle;
      const fullPath = parentPath + convertPatternToPath(layer.regexp?.source || "");

      const nestedSwagger = generateSwaggerJSONFromRouter(
        nestedRouter,
        fields,
        fullPath
      );
      Object.assign(swaggerData.paths, nestedSwagger.paths);
    }
  });

  return swaggerData;
};

export {generateSwaggerJSONFromRouter};