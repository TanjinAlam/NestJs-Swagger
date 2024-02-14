import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt'

export const jwtAsyncConfig: JwtModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<JwtModuleOptions> => {
        return {
            global: true,
            secret: configService.get<string>('APP_SECRET', 'secret'),
            signOptions: {
                expiresIn: configService.get<number>('APP_EXPIRES')
            }
        }
    }
}
