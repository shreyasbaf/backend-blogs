import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginResponse } from './dto/login-response.type';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const payload = { sub: user._id, email: user.email };
    return { token: this.authService.signPayload(payload) };
  }
}
