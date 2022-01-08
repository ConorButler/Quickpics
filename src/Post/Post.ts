import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Post {
  @Field((type) => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  caption?: string;
}
