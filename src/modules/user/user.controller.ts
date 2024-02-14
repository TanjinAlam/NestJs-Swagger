import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserService } from 'src/modules/user/user.service'

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/subscriptions')
    @ApiOperation({
        summary: 'View all subscription of user'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'User found',
        status: HttpStatus.OK
    })
    async findOne() {
        return {
            statusCode: HttpStatus.OK,
            message: 'User found'
            // result: await this.userService.findOne(userUuid)
        }
    }
}
