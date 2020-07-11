import {MigrationInterface, QueryRunner} from "typeorm";

export class update1594462601061 implements MigrationInterface {
    name = 'update1594462601061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "creatorId" integer)`);
        await queryRunner.query(`CREATE TABLE "subtask" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "done" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "todoId" integer)`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "done" boolean NOT NULL, "due" datetime, "starred" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "creatorId" integer, "listId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" text NOT NULL, "firstname" text, "lastname" text, "password" text NOT NULL, "settingsId" integer, CONSTRAINT "REL_390395c3d8592e3e8d8422ce85" UNIQUE ("settingsId"))`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "hideDone" boolean NOT NULL DEFAULT (0), "onlyStars" boolean NOT NULL DEFAULT (0), "listId" integer, "userId" integer, CONSTRAINT "REL_9175e059b0a720536f7726a88c" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "list_shared_with_user" ("listId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("listId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8f870f8b15f98c1726c0654b01" ON "list_shared_with_user" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_edbdc376a5c90d3e1f0ba04050" ON "list_shared_with_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "temporary_list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "creatorId" integer, CONSTRAINT "FK_b83bed21d1d68d6759d31afeda3" FOREIGN KEY ("creatorId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_list"("id", "name", "createdAt", "updatedAt", "creatorId") SELECT "id", "name", "createdAt", "updatedAt", "creatorId" FROM "list"`);
        await queryRunner.query(`DROP TABLE "list"`);
        await queryRunner.query(`ALTER TABLE "temporary_list" RENAME TO "list"`);
        await queryRunner.query(`CREATE TABLE "temporary_subtask" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "done" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "todoId" integer, CONSTRAINT "FK_c18d34a989b753de67e6edbb855" FOREIGN KEY ("todoId") REFERENCES "todo" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_subtask"("id", "title", "done", "createdAt", "updatedAt", "todoId") SELECT "id", "title", "done", "createdAt", "updatedAt", "todoId" FROM "subtask"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
        await queryRunner.query(`ALTER TABLE "temporary_subtask" RENAME TO "subtask"`);
        await queryRunner.query(`CREATE TABLE "temporary_todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "done" boolean NOT NULL, "due" datetime, "starred" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "creatorId" integer, "listId" integer, CONSTRAINT "FK_a4bb15f5b622b108dd0bc9d248d" FOREIGN KEY ("creatorId") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_b26d47a28b6cc4ea63f21fd1cd8" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_todo"("id", "title", "done", "due", "starred", "createdAt", "updatedAt", "creatorId", "listId") SELECT "id", "title", "done", "due", "starred", "createdAt", "updatedAt", "creatorId", "listId" FROM "todo"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`ALTER TABLE "temporary_todo" RENAME TO "todo"`);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" text NOT NULL, "firstname" text, "lastname" text, "password" text NOT NULL, "settingsId" integer, CONSTRAINT "REL_390395c3d8592e3e8d8422ce85" UNIQUE ("settingsId"), CONSTRAINT "FK_390395c3d8592e3e8d8422ce853" FOREIGN KEY ("settingsId") REFERENCES "settings" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "username", "firstname", "lastname", "password", "settingsId") SELECT "id", "username", "firstname", "lastname", "password", "settingsId" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
        await queryRunner.query(`CREATE TABLE "temporary_settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "hideDone" boolean NOT NULL DEFAULT (0), "onlyStars" boolean NOT NULL DEFAULT (0), "listId" integer, "userId" integer, CONSTRAINT "REL_9175e059b0a720536f7726a88c" UNIQUE ("userId"), CONSTRAINT "FK_38eaccc1f9416ef428b65f6b54b" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_9175e059b0a720536f7726a88c7" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_settings"("id", "hideDone", "onlyStars", "listId", "userId") SELECT "id", "hideDone", "onlyStars", "listId", "userId" FROM "settings"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`ALTER TABLE "temporary_settings" RENAME TO "settings"`);
        await queryRunner.query(`DROP INDEX "IDX_8f870f8b15f98c1726c0654b01"`);
        await queryRunner.query(`DROP INDEX "IDX_edbdc376a5c90d3e1f0ba04050"`);
        await queryRunner.query(`CREATE TABLE "temporary_list_shared_with_user" ("listId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "FK_8f870f8b15f98c1726c0654b013" FOREIGN KEY ("listId") REFERENCES "list" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_edbdc376a5c90d3e1f0ba04050e" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("listId", "userId"))`);
        await queryRunner.query(`INSERT INTO "temporary_list_shared_with_user"("listId", "userId") SELECT "listId", "userId" FROM "list_shared_with_user"`);
        await queryRunner.query(`DROP TABLE "list_shared_with_user"`);
        await queryRunner.query(`ALTER TABLE "temporary_list_shared_with_user" RENAME TO "list_shared_with_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_8f870f8b15f98c1726c0654b01" ON "list_shared_with_user" ("listId") `);
        await queryRunner.query(`CREATE INDEX "IDX_edbdc376a5c90d3e1f0ba04050" ON "list_shared_with_user" ("userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_edbdc376a5c90d3e1f0ba04050"`);
        await queryRunner.query(`DROP INDEX "IDX_8f870f8b15f98c1726c0654b01"`);
        await queryRunner.query(`ALTER TABLE "list_shared_with_user" RENAME TO "temporary_list_shared_with_user"`);
        await queryRunner.query(`CREATE TABLE "list_shared_with_user" ("listId" integer NOT NULL, "userId" integer NOT NULL, PRIMARY KEY ("listId", "userId"))`);
        await queryRunner.query(`INSERT INTO "list_shared_with_user"("listId", "userId") SELECT "listId", "userId" FROM "temporary_list_shared_with_user"`);
        await queryRunner.query(`DROP TABLE "temporary_list_shared_with_user"`);
        await queryRunner.query(`CREATE INDEX "IDX_edbdc376a5c90d3e1f0ba04050" ON "list_shared_with_user" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8f870f8b15f98c1726c0654b01" ON "list_shared_with_user" ("listId") `);
        await queryRunner.query(`ALTER TABLE "settings" RENAME TO "temporary_settings"`);
        await queryRunner.query(`CREATE TABLE "settings" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "hideDone" boolean NOT NULL DEFAULT (0), "onlyStars" boolean NOT NULL DEFAULT (0), "listId" integer, "userId" integer, CONSTRAINT "REL_9175e059b0a720536f7726a88c" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "settings"("id", "hideDone", "onlyStars", "listId", "userId") SELECT "id", "hideDone", "onlyStars", "listId", "userId" FROM "temporary_settings"`);
        await queryRunner.query(`DROP TABLE "temporary_settings"`);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" text NOT NULL, "firstname" text, "lastname" text, "password" text NOT NULL, "settingsId" integer, CONSTRAINT "REL_390395c3d8592e3e8d8422ce85" UNIQUE ("settingsId"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "username", "firstname", "lastname", "password", "settingsId") SELECT "id", "username", "firstname", "lastname", "password", "settingsId" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
        await queryRunner.query(`ALTER TABLE "todo" RENAME TO "temporary_todo"`);
        await queryRunner.query(`CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "done" boolean NOT NULL, "due" datetime, "starred" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "creatorId" integer, "listId" integer)`);
        await queryRunner.query(`INSERT INTO "todo"("id", "title", "done", "due", "starred", "createdAt", "updatedAt", "creatorId", "listId") SELECT "id", "title", "done", "due", "starred", "createdAt", "updatedAt", "creatorId", "listId" FROM "temporary_todo"`);
        await queryRunner.query(`DROP TABLE "temporary_todo"`);
        await queryRunner.query(`ALTER TABLE "subtask" RENAME TO "temporary_subtask"`);
        await queryRunner.query(`CREATE TABLE "subtask" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" text NOT NULL, "done" boolean NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "todoId" integer)`);
        await queryRunner.query(`INSERT INTO "subtask"("id", "title", "done", "createdAt", "updatedAt", "todoId") SELECT "id", "title", "done", "createdAt", "updatedAt", "todoId" FROM "temporary_subtask"`);
        await queryRunner.query(`DROP TABLE "temporary_subtask"`);
        await queryRunner.query(`ALTER TABLE "list" RENAME TO "temporary_list"`);
        await queryRunner.query(`CREATE TABLE "list" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" text NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "creatorId" integer)`);
        await queryRunner.query(`INSERT INTO "list"("id", "name", "createdAt", "updatedAt", "creatorId") SELECT "id", "name", "createdAt", "updatedAt", "creatorId" FROM "temporary_list"`);
        await queryRunner.query(`DROP TABLE "temporary_list"`);
        await queryRunner.query(`DROP INDEX "IDX_edbdc376a5c90d3e1f0ba04050"`);
        await queryRunner.query(`DROP INDEX "IDX_8f870f8b15f98c1726c0654b01"`);
        await queryRunner.query(`DROP TABLE "list_shared_with_user"`);
        await queryRunner.query(`DROP TABLE "settings"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "todo"`);
        await queryRunner.query(`DROP TABLE "subtask"`);
        await queryRunner.query(`DROP TABLE "list"`);
    }

}
