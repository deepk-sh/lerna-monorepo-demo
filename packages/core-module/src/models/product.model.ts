import {Entity, model, property} from '@loopback/repository';
import {FormattedDate} from '../decorators/formatted-date.decorator';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    required: false,
    useDefaultIdType: false,
    postgresql: {
      dataType: 'uuid',
    },
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @FormattedDate()
  createdOn: string;

  @FormattedDate()
  modifiedOn: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
