import { DefaultBaseEntity } from 'src/common/entities'
import { User } from 'src/modules/user/entities/user.entity'

import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    UpdateDateColumn
} from 'typeorm'
@Entity()
export class Magazine extends DefaultBaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: true })
    name: string

    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    title: string

    @Column({
        type: 'varchar',
        length: 500,
        nullable: false
    })
    description: string

    @Column({
        type: 'varchar',
        length: 122,
        nullable: false
    })
    publisherName: string

    @Column({
        type: 'varchar',
        length: 122,
        nullable: false
    })
    imagePath: string

    @Column({
        type: 'boolean',
        default: true
    })
    status: boolean

    @ManyToOne(() => User, (user) => user.magazine)
    user: User

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    /**
     * CONSTRUCTOR
     */
    constructor(
        title: string,
        description: string,
        imagePath: string,
        publisherName: string
    ) {
        super()
        this.title = title
        this.description = description
        this.publisherName = publisherName
        this.imagePath = imagePath
    }
}
