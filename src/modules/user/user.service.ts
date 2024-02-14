import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    /**
     * This method is called by authentication service
     */
    async findOneByUuid(uuid: string): Promise<User | undefined> {
        console.log('HERE PROBVLEM')
        return await this.userRepository.findOne({
            where: { uuid: uuid }
        })
    }
}
