import { AuthService } from '@application/service/Auth.service';
import { GetUserService } from '@application/service/GetUser.service';
import { AuthController } from '@infrastructure/controller/Auth.controller';
import { IdentityController } from '@infrastructure/controller/Identity.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MongoProvider } from '@shared/mongo-custom-provider/MongoProvider';
import { MysqlProvider } from '@shared/mysql-custom-provider/MysqlProvider';
import { convertEnvToBoolean } from '@shared/utils/ConvertEnvToBoolean';

import { AppConstants, jwtConstants } from './app.constants';

@Module({
  controllers: [AuthController, IdentityController],
  providers: [
    AuthService, //TODO: Mirar como generar un modulo e importarlo aquí para traer el servicio
    GetUserService,
    {
      provide: AppConstants.MYSQL_POOL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MYSQL_ACTIVE)) return null;
        return mysqlProvider;
      },
    },
    {
      provide: AppConstants.MONGO_POOL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MONGO_ACTIVE)) return null;
        return mongoProvider;
      },
    },
  ],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [],
})
export class AppModule {}

const mysqlProvider = MysqlProvider({
  name: AppConstants.MYSQL_POOL,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  maxConnections: Number(process.env.MYSQL_MAX_CONNECTIONS),
  minConnections: Number(process.env.MYSQL_MIN_CONNECTIONS),
});

const mongoProvider = MongoProvider({
  name: AppConstants.MONGO_POOL,
  host: process.env.MONGO_HOST,
  port: Number(process.env.MONGO_PORT),
  database: process.env.MONGO_DATABASE,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE),
  minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE),
});
