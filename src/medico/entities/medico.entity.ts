import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";
import { Column, Entity, OneToMany, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity('tb_medicos')
export class Medico {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({
        description: 'Precisa de conter exatamente 13 caracteres'
    })
    @IsNotEmpty()
    @Length(13)
    @Column({ nullable: false, unique: true, length: 13 })
    crm: string

    @OneToMany(() => Postagem, (postagem) => postagem.medico)
    @ApiProperty({type: () => Postagem})
    postagens: Postagem[]

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    @ApiProperty({type: () => Cadastro})
    cadastro: Cadastro
}