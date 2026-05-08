import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2";
import { execSync } from "node:child_process";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
    describe("User data access object", () => {    let service;
    let users;
    
    beforeEach(() => {
      users = PostgresUserDao.getInstance();
    })

    afterEach(async () => {
      await users.db.query("DELETE FROM users");
      PostgresUserDao.getInstance().close();
    });
  
      test ("saves new user", async () => {
        const userId = 1;
        const passwordHash = argon2.hashSync("password");

        await users.save({ userId, passwordHash });

        const result = await users.db.query("SELECT user_id FROM users");

        expect(result.rows.length).to.equal(1);
      })

      test ("saves values correctly", async () => {
        const userId = 1;
        const passwordHash = argon2.hashSync("password");
        const user = {"userid": userId, "passwordhash": passwordHash};

        await users.save({ userId, passwordHash });

        const result = await users.db.query(`SELECT user_id as userId, password_hash as passwordHash FROM users WHERE user_id = $1`, [userId]);

        expect(result.rows[0]).to.deep.equal(user);
      })

      test ("updates values if user already exists", async () => {
        const userId = 1;
        const passwordHash = argon2.hashSync("password");
        const oldUser = {userId, passwordHash};
        await users.save(oldUser);

        const savedUsers = await users.db.query(`SELECT user_id, password_hash FROM users WHERE user_id = $1`, [userId]);
        let user = savedUsers.rows.map((row) => {return {userId: row.user_id, passwordHash: row.password_hash}})[0];

        const newPasswordHash = argon2.hashSync("salasana");
        user.passwordHash = newPasswordHash;
        await users.save(user);

        const expectedUser = {"user_id": userId, "password_hash": newPasswordHash}
        const updatedUsers = await users.db.query(`SELECT user_id, password_hash FROM users WHERE user_id = $1`, [userId]);

        expect(updatedUsers.rows[0]).to.deep.equal(expectedUser);
      })

      test("finds 0 users if id doesn't match", async () => {
        const user = await users.getById(1);
        expect(user).to.be.a("null");
      })
    })

    describe("Password service", () => {
      let service;
      beforeEach(() => {
        service = new PasswordService();
      });

      afterEach(() => {
         PostgresUserDao.getInstance().close();
       });

      test("todo", () => {
        //nii
      })
    })
});
