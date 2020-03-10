import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../../../common/user/user.service";
import { UserController } from "./user.controller";
import { User } from "../../../common/user/user";
import { UserTokenService } from "../../../common/user/token/user-token.service";
import { UserToken } from "../../../common/user/token/user-token";
import { generate } from "randomstring";

// От generate нам нужно постоянное значение
jest.mock("randomstring", () => ({
  generate: jest.fn().mockReturnValue("thisCouldBeOurTokenString")
}));

describe("User Controller", () => {
  let app: TestingModule;
  let valid, invalid: User;
  let success: UserToken;
  let failure: Object;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserTokenService]
    }).compile();

    // Пользователи: валидный и невалидный
    valid = new User("user@user.ru", "87654321");
    invalid = new User("not@valid.ru", "invalidpass");

    // Ответы: успех и неудача
    success = new UserToken(generate());
    failure = {
      statusCode: 401,
      error: "Unauthorized"
    };
  });

  describe("success login", () => {
    it("should return token", () => {
      const userController = app.get<UserController>(UserController);
      expect(userController.login(valid)).toEqual(success);
    });
  });

  describe("failure login", () => {
    it("should return object with status code 401", () => {
      const userController = app.get<UserController>(UserController);
      expect(userController.login(invalid)).toEqual(failure);
    });
  });
});
