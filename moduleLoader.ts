import fs from "fs";
import path from "path";
import { Express } from "express";

export function dynamicModuleLoader(app: Express) {
  const pluginsDir = path.join(__dirname, "modules");

  fs.readdirSync(pluginsDir).forEach((folder) => {
    const modulePath = path.join(pluginsDir, folder);
    if (fs.statSync(modulePath).isDirectory()) {
      const indexFile = path.join(modulePath, "index.js");
      if (fs.existsSync(indexFile)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const plugin = require(indexFile);
        if (typeof plugin === "function") {
          plugin(app);
        } else if (plugin && typeof plugin.default === "function") {
          plugin.default(app);
        }
      }
    }
  });
}