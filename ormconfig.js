module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  logging: false,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  entities: [__dirname + './**/*.entity{.ts,js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ssl: {
    rejectUnauthorized: false,
  },
};
