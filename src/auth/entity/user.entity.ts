import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Session } from '@session/entity/session.entity';

@Entity()
export class User {
  @PrimaryKey()
  id: string;

  @Property()
  preferred_username: string;

  @ManyToOne(() => Session, { nullable: true })
  session: Session;
}
