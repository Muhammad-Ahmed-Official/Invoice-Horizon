import { ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context).getContext();
    const args = GqlExecutionContext.create(context).getArgs();

    // loginUserInput contains email and password
    gqlCtx.req.body = args.loginUserInput; 
    return gqlCtx.req;
  }
}