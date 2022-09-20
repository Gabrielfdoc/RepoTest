
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Comentario } from "../entities/comentario.entity";
import { ComentarioService } from "../services/comentario.service";

@ApiTags('Comentario')
@Controller('/comentario')
export class ComentarioController {

    constructor(
        private readonly service: ComentarioService
    ) { }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Comentario[]> {
        return this.service.findAll()
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um comentário existente no banco de dados!',
        type: Number
      })
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Comentario> {
        return this.service.findById(id)
    }

    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados em um Comentario',
        type: Comentario
      })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() comentario: Comentario): Promise<Comentario> {
        return this.service.create(comentario)
    }

    @ApiOkResponse({ description: 'O recurso foi atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados em um Comentario e apresentar o ID de um ' +
         'comentário existente no banco de dados',
        type: Comentario
      })
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() comentario: Comentario): Promise<Comentario> {
        return this.service.update(comentario)
    }

    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'O recurso foi deletado com sucesso!' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um comentário existente no banco de dados!',
        type: Number
      })
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }
}