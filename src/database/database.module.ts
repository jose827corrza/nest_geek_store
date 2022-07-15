import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';

import config from '../config';

const API_KEY = '12345634';
const API_KEY_PROD = 'PROD1212121SA';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { user, password, host, dbName, port } = configService.postgres; // aca tambien referenciar mysql
        return {
          type: 'postgres', //Aqui se cambiaria por el mysql si se quiere
          // Todo esto abajo se cambia por url para el despliegue en heroku
          // database: dbName, //tambien instalar mysql2 con npm, y arribica indicar que el mysql
          // username: user,
          // password,
          // host,
          // port,
          url: configService.herokuPostgres,
          synchronize: false, // mejor estar el false, y usar siempre migraciones
          autoLoadEntities: true,
          // esto es importante y lo pide heroku-postgres
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        // const { user, host, dbName, password, port } = configService.postgres;
        const client = new Client({
          connectionString: configService.herokuPostgres,
          ssl: {
            rejectUnauthorized: false,
          },
          // user,
          // host,
          // database: dbName,
          // password,
          // port,
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
