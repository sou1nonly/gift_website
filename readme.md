## Setup and Configure FiniQBook

> **Note:** This project uses TypeScript. All scripts (like migrations, seeds, and module creation) are run using `ts-node`.

### Configure finiqbook with npm

```bash
git clone **********
```

```bash
  npm install
```

### Run project in DEV mode.

```bash
npm run dev
```

### Run project in PROD mode.

```bash
npm start
```

### Create custom module

```bash
  npm run create:module modulename  modules/
```

Replace modulename with your module.

### Model Creation and Migration

#### Open .sequelizerc file in your project root.

```bash
module.exports = {
  config: path.resolve("./config/config.js"),
  "models-path": path.resolve("./modules/[model-name]/models"),
  "migrations-path": path.resolve("./modules/[model-name]/migrations"),
  "seeders-path": path.resolve("./modules/[model-name]/seeders"),
};
```

Replace [model-name] with your model name.

### Run

```bash
npx sequelize-cli model:generate --name model-name  --attributes column-name:data-type
```

Replace model-name and column-name with your name.\
Replace data-type with your desired data type.
---------------Generates .js files refractor to .ts

### Run Migrations

```bash 
npm run db:migrate
```


### Run Seeders

```bash (seed)
npm run db:seeds
```

### 5. **Optional: Add Swagger Docs Section**

If you use Swagger:

```markdown
### API Documentation

Visit [http://localhost:3000/api-docs](http://localhost:3000/api-docs) after starting the server.
```
