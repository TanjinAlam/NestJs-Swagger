import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateMagazineDTO } from './dto/create-magazine.dto'
import { UpdateMagazineDto } from './dto/update-magazine.dto'
import { Magazine } from './entities/magazine.entity'

@Injectable()
export class MagazineService {
    constructor(
        @InjectRepository(Magazine)
        private readonly magazineRepository: Repository<Magazine>
    ) {}
    async create(createMagazineDto: CreateMagazineDTO, req: Request) {
        return 'This action adds a new magazine'
    }

    async findAll() {
        return this.magazineRepository.find()
    }

    async findOne(id: number) {
        return this.magazineRepository.findOne({
            where: {
                id: id
            }
        })
    }

    async update(id: number, updateMagazineDto: UpdateMagazineDto) {
        const isUpdated = await this.magazineRepository.update(
            id,
            updateMagazineDto
        )
        if (isUpdated.affected === 0) {
            return {
                statusCode: 404,
                message: 'Magazine not found'
            }
        } else {
            return {
                statusCode: 200,
                message: 'Magazine updated successfully'
            }
        }
    }

    async remove(id: number) {
        // deelete the magazine
        const isDelete = await this.magazineRepository.softDelete(id)
        if (isDelete.affected === 0) {
            return {
                statusCode: 404,
                message: 'Magazine not found'
            }
        } else {
            return {
                statusCode: 200,
                message: 'Magazine deleted successfully'
            }
        }
    }
}
