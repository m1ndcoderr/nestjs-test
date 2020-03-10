import { Test, TestingModule } from "@nestjs/testing";
import { UserTokenService } from "./user-token.service";

describe("user-token service", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [UserTokenService]
    }).compile();
  });

  describe("Token creation", () => {
    it("should return string contains number, capital letter and lowercase letter", () => {
      const userTokenService = app.get<UserTokenService>(UserTokenService);
      expect(typeof userTokenService.createToken()).toBe("string");
      expect(userTokenService.createToken()).toMatch(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$")
      );
    });
  });
});
