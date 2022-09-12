import { Migration } from '@mikro-orm/migrations';

export class Migration20220912152457 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "session" ("id" serial primary key, "title" varchar(255) not null, "author" varchar(255) not null);');
  }

}
