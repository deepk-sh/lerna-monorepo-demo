import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {RestExternalDataSource} from '../datasources';
import {SchemaObject} from '@loopback/openapi-v3';

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export interface RestExternal {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getPosts(): Promise<Post[]>;
  addPost(post: Omit<Post, 'id'>): Promise<Post>;
  getPost(id: number): Promise<Post>;
}

export class RestExternalProvider implements Provider<RestExternal> {
  constructor(
    // restExternal must match the name property in the datasource json file
    @inject('datasources.restExternal')
    protected dataSource: RestExternalDataSource = new RestExternalDataSource(),
  ) {}

  value(): Promise<RestExternal> {
    return getService(this.dataSource);
  }
}

export const PostSchema: SchemaObject = {
  type: 'object',
  properties: {
    id: {type: 'number'},
    userId: {type: 'number'},
    title: {type: 'string'},
    body: {type: 'string'},
  },
};
