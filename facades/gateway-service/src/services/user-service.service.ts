import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {UserServiceDataSource} from '../datasources';
import {User} from '@demo/core-module';
import {Filter, FilterExcludingWhere} from '@loopback/repository';
import {Credentials} from '@loopback/authentication-jwt';

export interface UserService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getUsers(filter?: Filter<User>): Promise<User[]>;
  createUser(user: Partial<User>): Promise<User>;
  login(creds: Credentials): Promise<{token: string}>;
  findById(id: string, filter?: FilterExcludingWhere<User>): Promise<User>;
  create(user: Omit<User, 'id'>): Promise<User>;
}

export class UserServiceProvider implements Provider<UserService> {
  constructor(
    // userService must match the name property in the datasource json file
    @inject('datasources.userService')
    protected dataSource: UserServiceDataSource = new UserServiceDataSource(),
  ) {}

  value(): Promise<UserService> {
    return getService(this.dataSource);
  }
}
