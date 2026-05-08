import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2";
import { execSync } from "node:child_process";
import { expect } from "chai";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  describe("User data access object", () => {
    test ("saves new user", async () => {
      const users = PostgresUserDao.getInstance();
      const userId = 1;
      const passwordHash = await argon2.hash("password");

      await users.save({ userId, passwordHash });

      const result = await users.db.query("SELECT user_id FROM users");

      expect(result.rows.length).to.equal(1);
    })
  })
});
