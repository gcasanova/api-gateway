import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Company } from './../../companies/models/company.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  password: string;

  @Field(type => Company)
  company: Company;
}
