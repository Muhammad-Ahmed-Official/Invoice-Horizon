import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor() {
//       super({
//         jwtFromRequest: ExtractJwt.fromExtractors([
//           (req) => {
//             // console.log('🍪 Extractor cookies:', req?.cookies);
//             // console.log('🔑 Extracted token:', req?.cookies?.access_token);
//             return req?.cookies?.access_token;
//           },
//         ]),
//         ignoreExpiration: true,
//         secretOrKey: process.env.JWT_SECRET as string,
//       });
//     }

//   async validate(payload: any) {  // payload is decoded jwt
//     return { id: payload.sub, email: payload.userName }
//   }
// }


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // 1️⃣ Cookie (browser)
        (req) => req?.cookies?.access_token,

        // 2️⃣ Authorization: Bearer <token> (Postman, mobile, API)
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false, // ⚠️ SHOULD be false in real apps
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.userName,
    };
  }
}
