import { ApiProperty } from "@nestjs/swagger";
import { MaxLength } from "class-validator";
import { Column, Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cadastro } from "../../cadastro/entities/cadastro.entity";


@Entity('tb_pacientes')
export class Paciente {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @MaxLength(50)
    @Column({ nullable: true, length: 50 })
    convenio: string

    @OneToOne(() => Cadastro, { onDelete: "CASCADE" })
    @JoinColumn()
    @ApiProperty({type: () => Cadastro})
    cadastro: Cadastro
}