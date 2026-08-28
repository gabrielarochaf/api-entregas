import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "../app";

describe("UserController", () => {
  let user_id: string;

  afterAll(async () => {
    await prisma.user.delete({ where: { id: user_id } });
  });

  it("should create a new user successfully", async () => {
    const response = await request(app).post("/users").send({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("John Doe");

    user_id = response.body.id;
  });

  it("should not create a user with an existing email", async () => {
    const response = await request(app).post("/users").send({
      name: "Jane Doe Duplicate",
      email: "john.doe@example.com",
      password: "password123",
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Email already exists");
  });

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Invalid Email User",
      email: "invalid-email",
      password: "password123",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain("Error validation");
  });
});
