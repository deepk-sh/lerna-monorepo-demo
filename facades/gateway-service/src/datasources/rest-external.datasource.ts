import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {ResponseObject, OperationObject} from '@loopback/rest';
import path from 'path';

// const config = {
//   name: 'restExternal',
//   connector: 'rest',
//   baseUrl: 'https://jsonplaceholder.typicode.com',
//   crud: true,
//   options: {
//     headers: {
//       accept: 'application/json',
//       'Content-type': 'application/json; charset=UTF-8',
//     },
//   },
//   operations: [
//     {
//       template: {
//         method: 'GET',
//         url: '/posts',
//       },
//       functions: {
//         getPosts: [],
//       },
//     },
//     {
//       template: {
//         method: 'POST',
//         url: '/posts',
//         body: '{post}',
//       },
//       functions: {
//         addPost: ['post'],
//       },
//     },
//   ],
// };

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html

const config = {
  name: 'openapiExternal',
  connector: 'openapi',
  spec: path.resolve('./src/apispecs/json-placeholder-spec.json'),
  validate: true,
  positional: true,
  transformResponse: transformResponse,
};

function transformResponse(
  res: ResponseObject,
  operationSpec: OperationObject,
) {
  if (res.status < 400) {
    return res.body;
  }
  const err = new Error(`${res.status} ${res.statusText}`);

  throw err;
}

@lifeCycleObserver('datasource')
export class RestExternalDataSource
  extends juggler.DataSource
  implements LifeCycleObserver
{
  static dataSourceName = 'restExternal';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.restExternal', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
