import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {ProductServiceDataSource} from '../datasources';
import {Product} from '@demo/core-module';

export interface ProductService {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  getProducts(): Promise<Product[]>;
}

export class ProductServiceProvider implements Provider<ProductService> {
  constructor(
    // productService must match the name property in the datasource json file
    @inject('datasources.productService')
    protected dataSource: ProductServiceDataSource = new ProductServiceDataSource(),
  ) {}

  value(): Promise<ProductService> {
    return getService(this.dataSource);
  }
}
