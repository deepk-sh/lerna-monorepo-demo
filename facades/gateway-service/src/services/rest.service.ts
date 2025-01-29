import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestdsDataSource} from '../datasources';
import {User} from '@demo/core-module';

export interface Rest {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getUsers(): Promise<User[]>;
}

export class RestProvider implements Provider<Rest> {
  constructor(
    // restds must match the name property in the datasource json file
    @inject('datasources.restds')
    protected dataSource: RestdsDataSource = new RestdsDataSource(),
  ) {}

  value(): Promise<Rest> {
    return getService(this.dataSource);
  }
}
