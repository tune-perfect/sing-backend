import { Migration } from '@mikro-orm/migrations';

export class Migration20220913224600 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "session" ("id" varchar(255) not null, "uuid" varchar(255) not null, constraint "session_pkey" primary key ("id"));');

    this.addSql('create table "user" ("id" varchar(255) not null, "preferred_username" varchar(255) not null, "session_id" varchar(255) null, constraint "user_pkey" primary key ("id"));');

    this.addSql('alter table "user" add constraint "user_session_id_foreign" foreign key ("session_id") references "session" ("id") on update cascade on delete set null;');
  }

}
