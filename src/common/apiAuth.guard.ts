import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { API_KEY_HEADER, WHITELIST_DOMAINS } from "./constants";

@Injectable()
export class ApiAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const apiKey: string = request.header(API_KEY_HEADER);
    const host: string = request.header("host");

    if (process.env.API_GUARD !== "enable") return true;

    if (!WHITELIST_DOMAINS.some((domain) => host.includes(domain))) {
      throw new HttpException(
        `Unauthorized host ${host}`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (!apiKey || apiKey !== process.env.X_MCCODE_API_KEY) {
      throw new HttpException(
        `Missing ${API_KEY_HEADER} header key/value`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
