import {
  belongsTo,
  Entity,
  hasMany,
  model,
  property,
} from '@loopback/repository';
import {User} from './user.model';
import {Product} from './product.model';
import {FormattedDate} from '../decorators/formatted-date.decorator';

@model()
export class Order extends Entity {
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

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Product)
  productId: string;

  @hasMany(() => Product)
  products?: Product[];

  @FormattedDate()
  createdOn: string;

  @FormattedDate()
  modifiedOn: string;

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
