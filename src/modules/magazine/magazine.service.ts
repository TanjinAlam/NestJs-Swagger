import { Injectable } from '@nestjs/common'
import { CreateMagazineDTO } from './dto/create-magazine.dto'
import { UpdateMagazineDto } from './dto/update-magazine.dto'

@Injectable()
export class MagazineService {
    create(createMagazineDto: CreateMagazineDTO, req: Request) {
        return 'This action adds a new magazine'
    }

    findAll() {
        return `This action returns all magazine`
    }

    findOne(id: number) {
        return `This action returns a #${id} magazine`
    }

    update(id: number, updateMagazineDto: UpdateMagazineDto) {
        return `This action updates a #${id} magazine`
    }

    remove(id: number) {
        return `This action removes a #${id} magazine`
    }
}
