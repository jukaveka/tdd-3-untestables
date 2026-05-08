import { afterEach, beforeEach, describe, test } from "vitest";
import { PasswordService, PostgresUserDao } from "../src/untestable4.mjs";
import argon2 from "@node-rs/argon2";
import { execSync } from "node:child_process";

describe("Untestable 4: enterprise application", () => {
  let service;
  beforeEach(() => {
    service = new PasswordService();
  });

  afterEach(() => {
    PostgresUserDao.getInstance().close();
  });

  test("User data access object saves user", async () => {
    const users = PostgresUserDao.getInstance();
    const userId = 1;
    const passwordHash = await argon2.hash("password");

    const savedUser = await users.save({ userId, passwordHash });
  });
});
