import { Global, Module } from '@nestjs/common';
import { MONGO, MYSQL, REDIS } from 'app.constants';
import { convertEnvToBoolean, MongoProvider, MysqlProvider, RedisProvider } from 'pkg-shared';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Global()
@Module({
  imports: [AuthModule, UserModule],
  controllers: [],
  providers: [
    {
      provide: MYSQL,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MYSQL_ACTIVE)) return null;
        return MysqlProvider({
          name: MYSQL.toString(),
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
      provide: MONGO,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.MONGO_ACTIVE)) return null;
        return MongoProvider({
          name: MONGO.toString(),
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
      provide: REDIS,
      useFactory: async () => {
        if (!convertEnvToBoolean(process.env.REDIS_ACTIVE)) return null;
        return RedisProvider();
      },
    },
  ],
  exports: [MYSQL, MONGO, REDIS],
})
export class AppModule {}
