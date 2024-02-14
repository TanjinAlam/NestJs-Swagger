import { Body, Controller, HttpStatus, Inject, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { APIResponse } from 'src/common/interfaces'
import { User } from '../user/entities/user.entity'
import { LoginDTO, RegistrationDTO } from './dto/auth.dto'
import { AuthService } from './service/auth.service'

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly authService: AuthService

    // @Post('register')
    // private async register(@Body() registerRequestDto: RegisterRequestDto) {
    //     try {
    //         const result = await this.service.register(registerRequestDto)
    //         return {
    //             status: HttpStatus.CREATED,
    //             message: 'User has been created',
    //             result: result
    //         }
    //     } catch (error) {
    //         throw new ConflictException(error.message)
    //     }
    // }

    @Post('registration')
    @ApiOperation({
        summary: 'Registration Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Registration successful',
        status: HttpStatus.CREATED
    })
    async registration(
        @Body() registrationDto: RegistrationDTO
    ): Promise<APIResponse<RegisteredUser>> {
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Registration done successfully',
            result: await this.authService.registration(registrationDto)
        }
    }

    @Post('user-login')
    @ApiOperation({
        summary: 'User login Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'User login successful',
        status: HttpStatus.OK
    })
    async userlogin(
        @Body() loginRequestDto: LoginDTO
    ): Promise<APIResponse<User>> {
        return {
            statusCode: HttpStatus.OK,
            message: 'User logged in successful',
            result: await this.authService.userLogin(loginRequestDto)
        }
    }

    @Post('admin-login')
    @ApiOperation({
        summary: 'Admin login Endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Admin login successful',
        status: HttpStatus.OK
    })
    async login(@Body() loginRequestDto: LoginDTO): Promise<APIResponse<User>> {
        return {
            statusCode: HttpStatus.OK,
            message: 'Admin logged in successful',
            result: await this.authService.login(loginRequestDto)
        }
    }
}
