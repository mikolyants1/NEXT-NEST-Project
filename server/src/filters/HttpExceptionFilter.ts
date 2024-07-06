import { Catch, HttpException } from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements HttpExceptionFilter