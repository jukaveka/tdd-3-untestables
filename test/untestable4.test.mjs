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

    afterEach(() => {
      PostgresUserDao.getInstance().close();
    });
  
      test ("saves new user", async () => {
        const userId = 1;
        const passwordHash = await argon2.hash("password");

        await users.save({ userId, passwordHash });

        const result = await users.db.query("SELECT user_id FROM users");

        expect(result.rows.length).to.equal(1);
      })

      test ("saves values correctly", async () => {
        const userId = 1;
        const passwordHash = await argon2.hash("password");
        const user = {"userid": userId, "passwordhash": passwordHash};

        await users.save({ userId, passwordHash });

        const result = await users.db.query(`SELECT user_id as userId, password_hash as passwordHash FROM users WHERE user_id = $1`, [userId]);

        expect(result.rows[0]).to.deep.equal(user);
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
