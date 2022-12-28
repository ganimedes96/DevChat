import sinon from "sinon";
import chai from "chai";
import chaiHttp from "chai-http";
import App from "../app";
import { PrismaClient } from "@prisma/client";

chai.use(chaiHttp);
const { expect } = chai;
const { app } = new App();
const prisma = new PrismaClient();

interface userProps {
  id: string;
  username: string;
  password: string;
  img_url: string;
}

const user = {
  id: "clbykvswx0000i0kadsdnp4tk",
  username: "jhon",
  password: "123456",
  img_url: "https://github.com/jhon.png",
};

describe("test user route", async () => {
 
  it("should be able to register a new user", async () => {
    beforeAll(async () => {
      sinon.stub(prisma.user, "create").resolves(user) as unknown as userProps;
    });
    const result = await chai.request(app).post("/users/register").send(user);
    const array = await prisma.user.findMany()
    const userRegister = [...array].pop()
    expect(result).to.have.status(201);
    console.log(userRegister);
    
    expect(result.body).to.deep.equal(userRegister);
    afterAll(() => {
      (prisma.user.create as sinon.SinonStub).restore();
    });
   });
});
it("should return an error if the username is not provided ", async () => {
  const result = await chai
    .request(app)
    .post("/users/register")
    .send(user.password);
  expect(result).to.be.status(400);
  expect(result.body).to.be.deep.equal({
    message: "All fields must be filled",
  });
});
it("should return an error if the password is not provided ", async () => {
  const result = await chai
    .request(app)
    .post("/users/register")
    .send(user.username);
  expect(result).to.be.status(400);
  expect(result.body).to.be.deep.equal({
    message: "All fields must be filled",
  });

  it("should not be able to register a new user username with less than 3 characters", async () => {
    const usernameInvalid = {
      username: "aa",
      password: "123456",
    };
    const result = await chai
      .request(app)
      .post("/users/register")
      .send(usernameInvalid);
    expect(result).to.be.status(400);
    expect(result.body).to.be.deep.equal({ message: "Invalid username" });
  });
  
});
