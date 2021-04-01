import {
   Entity,
   SerializedPrimaryKey,
   PrimaryKey,
   Property
} from '@mikro-orm/core';
import { ObjectId } from 'mongodb';

import { IUser } from '../interfaces/IUser';

@Entity()
export class User implements IUser {

   @PrimaryKey()
   _id!: ObjectId;

   @SerializedPrimaryKey()
   id!: string;

   @Property()
   email!: string;
   @Property()
   password!: string;

   public constructor(partial?: Partial<User>) {
      Object.assign(this, partial);
   }
}