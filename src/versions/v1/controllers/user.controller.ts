import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "../../../common/user/user.service";
import { User } from "../../../common/user/user";
import { UserToken } from "../../../common/user/token/user-token";
import * as rs from "randomstring";

@Controller("v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("login")
  login(@Body() u: User): UserToken | Object {
    return this.userService
      .list()
      .some(i => i.email === u.email && i.password === u.password)
      ? new UserToken(rs.generate())
      : {
          statusCode: 401,
          error: "Unauthorized"
        };
  }
}
