import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserTokenService } from "./token/user-token.service";
import { User } from "./user";

describe("user service", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserService, UserTokenService]
    }).compile();
  });

  describe("Receiving of users", () => {
    it("should be object and should be array", () => {
      const userService = app.get<UserService>(UserService);
      expect(typeof userService.list()).toBe("object");
      expect(Array.isArray(userService.list())).toBe(true);
    });

    it("should return array with admin", () => {
      const userService = app.get<UserService>(UserService);
      expect(userService.list()).toEqual(
        expect.arrayContaining([new User("admin@admin.ru", "12345678")])
      );
    });
  });
});
