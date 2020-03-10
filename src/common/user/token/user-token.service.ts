import { Injectable } from "@nestjs/common";
import { generate } from "randomstring";

@Injectable()
export class UserTokenService {
  createToken(): string {
    return generate();
  }
}
