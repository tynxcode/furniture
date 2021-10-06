import { AuthService } from './auth.service';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { SigninArgs } from './dto/auth.args';
import { SignIn } from './models/jwt.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Query(() => SignIn)
  async signin( @Args() signinArgs: SigninArgs): Promise<SignIn> {
    const result = await this.authService.signin(signinArgs)
    return result
  }
}
