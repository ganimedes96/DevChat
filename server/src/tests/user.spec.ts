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
  // beforeEach(async () => {
  //   sinon.stub(prisma.user, "create").resolves(user) as unknown as userProps;
  // });
  it("should be able to register a new user", async () => {
    const userRegister = {
      username: "jhon",
      password: "123456",
      img_url: "https://github.com/jhon.png",
    };
    const result = await chai.request(app).post("/users/register").send(userRegister);
    expect(result).to.have.status(201);
    expect(result.body).to.deep.equal(userRegister);
  });
  // afterEach(() => {
  //   (prisma.user.create as sinon.SinonStub).restore();
  // });
});
