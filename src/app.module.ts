import { Global, Module } from '@nestjs/common';
import { convertEnvToBoolean, MongoProvider, MysqlProvider, RedisProvider } from 'pkg-shared';
import { AppConstants } from './app.constants';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { UserModule } from './modules/user/user.module';

@Global()
@Module({
  imports: [AuthenticationModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: AppConstants.MYSQL_POOL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MYSQL_ACTIVE)) return null;
        return MysqlProvider({
          name: AppConstants.MYSQL_POOL,
          host: process.env.MYSQL_HOST,
          port: Number(process.env.MYSQL_PORT),
          database: process.env.MYSQL_DATABASE,
          user: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          maxConnections: Number(process.env.MYSQL_MAX_CONNECTIONS),
          minConnections: Number(process.env.MYSQL_MIN_CONNECTIONS),
        });
      },
    },
    {
      provide: AppConstants.MONGO_POOL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MONGO_ACTIVE)) return null;
        return MongoProvider({
          name: AppConstants.MONGO_POOL,
          host: process.env.MONGO_HOST,
          port: Number(process.env.MONGO_PORT),
          database: process.env.MONGO_DATABASE,
          user: process.env.MONGO_USER,
          password: process.env.MONGO_PASSWORD,
          maxPoolSize: Number(process.env.MONGO_MAX_POOL_SIZE),
          minPoolSize: Number(process.env.MONGO_MIN_POOL_SIZE),
        });
      },
    },
    {
      provide: AppConstants.REDIS_POOL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.REDIS_ACTIVE)) return null;
        return RedisProvider();
      },
    },
  ],
  exports: [
    AppConstants.MYSQL_POOL,
    AppConstants.MONGO_POOL,
    AppConstants.REDIS_POOL,
  ],
})
export class AppModule {}
