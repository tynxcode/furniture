import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/guard/graphql.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { SignUpInput, UpdatePasswordInput, UpdateProfileInput } from './dto/user.input';
import { Profile, User } from './models/user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //GraphQL Query
  @UseGuards(GraphQLGuard)
  @Query(() => Profile)
  async profile(@CurrentUser() user: User): Promise<Profile> {
    return await this.userService.profile(user._id)
  }

  @Mutation(() => User)
  async signup(@Args('user') user: SignUpInput ): Promise<User> {
    return await this.userService.signup(user)
  }

  //GraphQL Mutation
  @UseGuards(GraphQLGuard)
  @Mutation(() => Profile)
  async updateProfile(@CurrentUser() user: User , @Args('info') updateInfo: UpdateProfileInput): Promise<Profile> {
    return await this.userService.updateProfile(user._id, updateInfo)
  }

  @UseGuards(GraphQLGuard)
  @Mutation(() => Profile)
  async updatePassword(@CurrentUser() user: User, @Args('info') updateInfo: UpdatePasswordInput ): Promise<Profile> {
    return await this.userService.updatePassword(user._id, updateInfo)
  }

}
