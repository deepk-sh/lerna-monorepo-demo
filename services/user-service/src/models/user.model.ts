import {model} from '@loopback/repository';
import {User as UserModel} from '@demo/core-module';

@model()
export class User extends UserModel {
  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
