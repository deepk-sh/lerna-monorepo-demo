import {model} from '@loopback/repository';
import {Order as OrderModel} from '@demo/core-module';

@model()
export class Order extends OrderModel {
  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
