import {  Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { jwtConstant } from "./constant/constant";

import { JwtAuthGuard } from "./jwtGuard";

import { JwtStrategy } from "./jwtStrategy";



@Module({
    imports:[JwtModule.register({
        secret:jwtConstant.secret
    }),PassportModule],
    providers:[JwtAuthGuard,JwtStrategy,],
    exports:[JwtAuthGuard,JwtStrategy,JwtModule]

})export class JwtLocalModule{}