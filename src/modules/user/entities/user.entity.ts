import * as bcrypt from 'bcrypt'
import { Exclude } from 'class-transformer'
import { IsEmail, IsString } from 'class-validator'
import { DefaultBaseEntity } from 'src/common/entities'
import { UserType } from 'src/common/enums'
import { Magazine } from 'src/modules/magazine/entities/magazine.entity'

import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    UpdateDateColumn
} from 'typeorm'
@Entity()
export class User extends DefaultBaseEntity {
    @Column({ type: 'varchar', length: 30, nullable: true })
    name: string

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false
    })
    @IsEmail()
    email: string

    @Column({
        type: 'enum',
        enum: UserType,
        nullable: false,
        default: UserType.User
    })
    userType: UserType

    @Exclude()
    @Column({ type: 'varchar', length: 255, nullable: false })
    @IsString()
    password: string

    @OneToMany(() => Magazine, (magazine) => magazine.user)
    magazine: Magazine[]

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @BeforeInsert()
    async hashPassword() {
        if (this.password) this.password = await bcrypt.hash(this.password, 10)
    }

    /**
     * CONSTRUCTOR
     */
    constructor(
        name: string,
        email: string,
        password: string,
        userType: UserType
    ) {
        super()
        this.name = name
        this.password = password
        this.email = email
        this.userType = userType
    }
}
