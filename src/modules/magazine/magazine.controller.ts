import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiOperation,
    ApiResponse
} from '@nestjs/swagger'
import { UserRole } from 'src/common/decorators/roles.decorator'
import { Roles } from 'src/common/enums'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { RoleGuard } from 'src/common/guards/roles.guard'
import { FilesToBodyInterceptor } from 'src/utils/app.utils'
import { CreateMagazineDTO } from './dto/create-magazine.dto'
import { UpdateMagazineDto } from './dto/update-magazine.dto'
import { MagazineService } from './magazine.service'

@UseGuards(JwtAuthGuard, RoleGuard)
@Controller('magazine')
export class MagazineController {
    constructor(private readonly magazineService: MagazineService) {}

    @Post()
    @UserRole(Roles.Admin)
    @ApiConsumes('multipart/form-data') // Add this line
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Magazine create endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Magazine created successful',
        status: HttpStatus.CREATED
    })
    @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
    create(
        @Request() req: Request,
        @Body(new ValidationPipe())
        createMagazineDto: CreateMagazineDTO
    ) {
        // return this.magazineService.create(createMagazineDto)
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Magazine created successfully',
            result: this.magazineService.create(createMagazineDto, req)
        }
    }



    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.magazineService.findOne(+id)
    }

    @Patch(':id')
    @UserRole(Roles.Admin, Roles.User)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Magazine update endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Magazine update successful',
        status: HttpStatus.CREATED
    })
    update(
        @Param('id') id: string,
        @Body() updateMagazineDto: UpdateMagazineDto
    ) {
        return this.magazineService.update(+id, updateMagazineDto)
    }

    @Delete(':id')
    @UserRole(Roles.Admin, Roles.User)
    @ApiBearerAuth()
    @ApiOperation({
        summary: 'Magazine delete endpoint'
    })
    @ApiResponse({
        description: 'Something went wrong',
        status: HttpStatus.BAD_REQUEST
    })
    @ApiResponse({
        description: 'Magazine delete successful',
        status: HttpStatus.CREATED
    })
    remove(@Param('id') id: string) {
        return this.magazineService.remove(+id)
    }
}
