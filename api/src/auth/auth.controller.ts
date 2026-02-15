import {
  Controller,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Role } from 'src/common/enums/role.enum';
import { IJwtPayload } from './entities/jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  @Post('token')
  issue(@Headers('x-api-key') apiKey?: string): IssueTokenResponse {
    const validKey = this.config.getOrThrow<string>('AUTH_API_KEY');
    if (!apiKey || apiKey !== validKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    const payload: IJwtPayload = { sub: 'api-client', role: Role.ADMIN };
    const access_token: IssueTokenResponse = {
      access_token: this.jwt.sign(payload),
    };

    return access_token;
  }
}

type IssueTokenResponse = { access_token: string };
