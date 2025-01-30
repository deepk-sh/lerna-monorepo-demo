import {inject} from '@loopback/core';
import {
  Count,
  DataObject,
  DefaultCrudRepository,
  Options,
  Where,
} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {User, UserRelations} from '../models';
import {ISODate} from '@demo/core-module';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(@inject('datasources.db') dataSource: DbDataSource) {
    super(User, dataSource);
  }

  async updateById(
    id: string | undefined,
    data: DataObject<User>,
    options?: Options,
  ): Promise<void> {
    data.modifiedOn = ISODate();
    await super.updateById(id, data, options);
  }

  async updateAll(
    data: DataObject<User>,
    where?: Where<User> | undefined,
    options?: Options,
  ): Promise<Count> {
    data.modifiedOn = ISODate();
    return await super.updateAll(data, where, options);
  }
}
