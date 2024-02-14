import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/modules/user/user.service'
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    @Inject(UserService)
    private readonly userService: UserService

    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'asdf'
        })
    }

    async validate(payload: any) {
        // if (!payload.sub) throw new UnauthorizedException('Access unauthorized')
        // const user = await this.userService.findOneByUuid(payload.sub)
        // if (!user) throw new BadRequestException('Can not find user')
        // return user
        return payload
    }
}
