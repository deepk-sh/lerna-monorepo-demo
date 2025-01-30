// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {OrderService, UserService} from '../services';
import {
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  response,
} from '@loopback/rest';
import {User} from '@demo/core-module';
import {Filter} from '@loopback/repository';

export class GatewayController {
  constructor(
    @inject('services.UserService') protected userService: UserService,
    @inject('services.OrderService') protected orderService: OrderService,
  ) {}

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
    return this.userService.getUsers(filter);
  }

  @get('/users-order')
  @response(200, {
    description: 'Array of User model instances with orders',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async findUsersWithOrder(): Promise<User[]> {
    // const users = await this.userService.getUsers();
    // const orders = await this.orderService.getOrders();

    // optimizing the service call using Promise.allSettled()
    const [userResult, orderResult] = await Promise.allSettled([
      this.userService.getUsers(),
      this.orderService.getOrders(),
    ]);

    if (userResult.status === 'rejected') {
      throw new HttpErrors.InternalServerError(
        `Failed to fetch users: ${userResult.reason}`,
      );
    }
    if (orderResult.status === 'rejected') {
      throw new HttpErrors.InternalServerError(
        `Failed to fetch users: ${orderResult.reason}`,
      );
    }

    const users = userResult.value;
    const orders = orderResult.value;

    const userOrders = users.map(u => {
      const userWithOrders = new User(u);
      userWithOrders.orders = orders.filter(o => o.userId === u.id);
      return userWithOrders;
    });
    return userOrders;
  }
}
