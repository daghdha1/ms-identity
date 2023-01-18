import { MongoRepositoryConfiguration } from './MongoConfiguration';
import { MongoClient } from 'mongodb';

export abstract class MongoRepository {
  constructor(
    protected readonly pool: MongoClient,
    private readonly configuration: MongoRepositoryConfiguration
  ) {}
}
