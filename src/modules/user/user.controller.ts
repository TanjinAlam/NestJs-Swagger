import { Controller, Get, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { UserService } from 'src/modules/user/user.service'

@Controller('/users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/subscriptions')
    @ApiOperation({
        summary: 'View all subscription endpoint'
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
            result: await this.userService.find(userUuid)
        }
    }


    @Get()
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Get all endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Magazine found successful',
        status: HttpStatus.CREATED
    })
    findAll() {
        return this.userService.findAll()
    }
}
