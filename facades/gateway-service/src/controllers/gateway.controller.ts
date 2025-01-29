// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {Rest} from '../services';
import {get, getModelSchemaRef, param, response} from '@loopback/rest';
import {User} from '@demo/core-module';
import {Filter} from '@loopback/repository';

export class GatewayController {
  constructor(@inject('services.Rest') protected restService: Rest) {}

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {
            includeRelations: true,
            exclude: ['orders'],
          }),
        },
      },
    },
  })
  async findUsers(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.restService.getUsers();
  }
}
