import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Response{
    @Field()
    success: boolean;

    @Field()
    message: string;
} 