import { User } from '@auth/entity/user.entity';
import { Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Session {
  @PrimaryKey()
  id: string;

  @Property()
  uuid: string = v4();

  @OneToMany(() => User, (user) => user.session)
  users: User[];
}
