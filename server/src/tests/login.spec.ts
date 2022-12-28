import sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import App from "../app";
import { PrismaClient } from "@prisma/client";

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const prisma = new PrismaClient();
const user = [{
  id: "clbykvswx0000i0kadsdnp4tk",
  username: "Felix",
  password: "123456",
  img_url: "https://github.com/Felix.png",
}];

describe("test login route", async () => {
 
  it("must be able to login successfully", async () => {
    const user = {
      username: "Felix",
      password: "123456",
    };
    const result = await chai.request(app).post("/login").send(user);
    expect(result).to.have.status(200);
  });
  it("login without username", async () => {
    const result = await chai.request(app).post("/login").send(user[0].password);
    expect(result).to.have.status(400);
    expect(result.body).to.be.deep.equal({
      message: "All fields must be filled",
    });
  });
  it("login without password", async () => {
    const result = await chai.request(app).post("/login").send(user[0].username);
    expect(result).to.have.status(400);
    expect(result.body).to.be.deep.equal({
      message: "All fields must be filled",
    });
  });
  it("login with incorrect username", async () => {
    const usernameInvalid = {
      username: "ganimedes",
      password: "123456",
    };
    const result = await chai.request(app).post("/login").send(usernameInvalid);
    expect(result).to.have.status(401);
    expect(result.body).to.be.deep.equal({
      message: "username or password incorrect",
    });
  });
  it("login with incorrect password", async () => {
    const passwordInvalid = {
      username: "ganimedes96",
      password: "1234",
    };
    const result = await chai.request(app).post("/login").send(passwordInvalid);
    expect(result).to.have.status(401);
    expect(result.body).to.be.deep.equal({
      message: "username or password incorrect",
    });
  });
  
});
