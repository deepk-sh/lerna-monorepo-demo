import {model} from '@loopback/repository';
import {Product as ProductModel} from '@demo/core-module';

@model()
export class Product extends ProductModel {
  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
