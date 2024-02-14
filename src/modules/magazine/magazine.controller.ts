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
    ValidationPipe
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard'
import { CreateMagazineDTO } from './dto/create-magazine.dto'
import { UpdateMagazineDto } from './dto/update-magazine.dto'
import { MagazineService } from './magazine.service'

@UseGuards(JwtAuthGuard)
@Controller('magazine')
export class MagazineController {
    constructor(private readonly magazineService: MagazineService) {}

    @Post()
    // @ApiConsumes('multipart/form-data') // Add this line
    // @ApiOperation({
    //     summary: 'Magazine create Endpoint'
    // })
    // @ApiResponse({
    //     description: 'Something went wrong',
    //     status: HttpStatus.BAD_REQUEST
    // })
    // @ApiResponse({
    //     description: 'Magazine created successful',
    //     status: HttpStatus.CREATED
    // })
    // @UseInterceptors(FilesInterceptor('files'), FilesToBodyInterceptor)
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

    @Get()
    findAll() {
        return this.magazineService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.magazineService.findOne(+id)
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateMagazineDto: UpdateMagazineDto
    ) {
        return this.magazineService.update(+id, updateMagazineDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.magazineService.remove(+id)
    }
}
