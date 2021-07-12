module.exports = [
  {
    name: 'default',
    type: process.env.DB_CLIENT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATION],
    cli: {
      migrationsDir: process.env.TYPEORM_CLI,
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'gobarber',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
];
