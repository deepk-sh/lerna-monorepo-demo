import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'userService',
  connector: 'rest',
  crud: false,
  options: {
    baseUrl: 'http://127.0.0.1:3001',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  },
  operations: [
    {
      template: {
        method: 'GET',
        url: '/users',
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        getUsers: ['filter'],
      },
    },
    {
      template: {
        method: 'POST',
        url: '/users',
        body: '{user}',
      },
      functions: {
        createUser: ['user'],
      },
    },
    {
      template: {
        method: 'POST',
        url: '/login',
        body: '{creds}',
      },
      functions: {
        login: ['creds'],
      },
    },
    {
      template: {
        method: 'GET',
        url: '/users',
        body: '{user}',
      },
      functions: {
        create: ['user'],
      },
    },
    {
      template: {
        method: 'GET',
        url: '/users/{id}',
        query: {
          filter: '{filter}',
        },
      },
      functions: {
        findById: ['id', 'filter'],
      },
    },
  ],
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class UserServiceDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'userService';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.userService', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
