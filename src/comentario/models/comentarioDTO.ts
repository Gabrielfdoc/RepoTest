import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { Expose } from "class-transformer";
import { ClassSerializerInterceptor, UseInterceptors } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

@UseInterceptors(ClassSerializerInterceptor)
export class ComentarioDTO {

    @ApiProperty()
    @Expose({name: "id"})
    id: number

    @ApiProperty({
        description: 'Precisa de conter entre 10 e 300 caracteres.'
    })
    @IsNotEmpty()
    @MaxLength(300)
    @MinLength(10)
    @Expose({name: "conteudo"})
    conteudo: string

    @ApiProperty()
    @IsNotEmpty()
    dataComentario: Date

    @ApiProperty()
    @IsNotEmpty()
    @Expose({name: "postagem"})
    postagem: number

    @ApiProperty()
    @IsNotEmpty()
    @Expose({name: "cadastro"})
    cadastro: number
}
