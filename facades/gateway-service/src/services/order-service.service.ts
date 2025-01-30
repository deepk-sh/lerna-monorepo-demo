import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {OrderServiceDataSource} from '../datasources';
import {Order} from '@demo/core-module';
import {Filter} from '@loopback/repository';

export interface OrderService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getOrders(filter?: Filter<Order>): Promise<Order[]>;
}

export class OrderServiceProvider implements Provider<OrderService> {
  constructor(
    // orderService must match the name property in the datasource json file
    @inject('datasources.orderService')
    protected dataSource: OrderServiceDataSource = new OrderServiceDataSource(),
  ) {}

  value(): Promise<OrderService> {
    return getService(this.dataSource);
  }
}
