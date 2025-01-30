import {Entity, hasMany, model, property} from '@loopback/repository';
import {Order} from './order.model';
import {FormattedDate} from '../decorators/formatted-date.decorator';

enum ROLE {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  SUBSCRIBER = 'subscriber',
}

@model()
export class User extends Entity {
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

  @hasMany(() => Order)
  orders?: Order[];

  @property({
    type: 'string',
    required: false,
    default: ROLE.SUBSCRIBER,
    jsonSchema: {
      enum: Object.values(ROLE),
    },
  })
  role: ROLE;

  @FormattedDate()
  createdOn: string;

  @FormattedDate()
  modifiedOn: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
