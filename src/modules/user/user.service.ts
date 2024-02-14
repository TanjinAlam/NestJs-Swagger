import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { Magazine } from '../magazine/entities/magazine.entity'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Magazine)
        private readonly magazineRepository: Repository<Magazine>
    ) {}
    //view all subscription
    async findAll(userUuid: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: { uuid: userUuid },
            relations: ['magazines']
        })
    }
    /**
     * This method is called by authentication service
     */
    async findOneByUuid(uuid: string): Promise<User | undefined> {
        console.log('HERE PROBVLEM')
        return await this.userRepository.findOne({
            where: { uuid: uuid }
        })
    }

    //subscribe to magazine
    async subscribeToMagazine(userUuid: string, magazineId: string) {
        const user = await this.userRepository.findOne({
            where: { uuid: userUuid }
        })
        const magazine = await this.magazineRepository.findOne({
            where: { uuid: magazineId }
        })
        if (!user || !magazine) {
            return {
                statusCode: 404,
                message: 'User or Magazine not found'
            }
        }
        // user.magazines.push(magazine)
        await this.userRepository.save(user)
        return {
            statusCode: 200,
            message: 'User subscribed to magazine successfully'
        }
    }

    //cancel subscription
    async cancelSubscription(userUuid: string, magazineId: string) {
        const user = await this.userRepository.findOne({
            where: { uuid: userUuid },
            relations: ['magazines']
        })
        if (!user) {
            return {
                statusCode: 404,
                message: 'User not found'
            }
        }
        user.magazines = user.magazines.filter(
            (magazine) => magazine.uuid !== magazineId
        )
        await this.userRepository.save(user)
        return {
            statusCode: 200,
            message: 'User subscription cancelled successfully'
        }
    }
}
