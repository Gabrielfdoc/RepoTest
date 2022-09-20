import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CadastroService } from "../services/cadastro.service";
import { DeleteResult } from "typeorm";
import { Cadastro } from "../entities/cadastro.entity";
import { Paciente } from "../../paciente/entities/paciente.entity";
import { Medico } from "../../medico/entities/medico.entity";
import { CadastroTemporarioMedicoDTO } from "../model/cadastrotemporariomedicodto";
import { CadastroTemporarioPacienteDTO } from "../model/cadastrotemporariopacientedto";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags, ApiUnprocessableEntityResponse } from "@nestjs/swagger";

@ApiTags('Cadastro')
@Controller('/cadastro')
export class CadastroController {

    constructor(
        private readonly service: CadastroService
    ) { }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioMedicoDTO',
        type: CadastroTemporarioMedicoDTO
      })
    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @Post('/medico')
    @HttpCode(HttpStatus.CREATED)
    createMedico(@Body() cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {
        return this.service.createMedico(cadastroTemporarioMedicoDTO)
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioPacienteDTO',
        type: CadastroTemporarioPacienteDTO
      })
    @ApiCreatedResponse({ description: 'Criado com sucesso!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @Post('/paciente')
    @HttpCode(HttpStatus.CREATED)
    createPaciente(@Body() cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {
        return this.service.createPaciente(cadastroTemporarioPacienteDTO)
    }

    @ApiParam({
        name: 'id',
        required: true,
        description: 'Tem de ser o ID de um cadastro existente no banco de dados!',
        type: Number
      })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiNoContentResponse({ description: 'O recurso foi deletado com sucesso!' })
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.service.delete(id)
    }

    @ApiOkResponse({ description: 'Os recursos foram retornados com sucesso!' })
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Cadastro[]> {
        return this.service.findAll()
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioMedicoDTO e não é possível alterar o CRM',
        type: CadastroTemporarioMedicoDTO
      })
    @ApiOkResponse({ description: 'O recurso foi atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @Put('/medico')
    @HttpCode(HttpStatus.OK)
    updateMedico(@Body() cadastroTemporarioMedicoDTO: CadastroTemporarioMedicoDTO): Promise<Medico> {
        return this.service.updateMedico(cadastroTemporarioMedicoDTO)
    }

    @ApiBody({
        required: true,
        description: 'Deve conter todos os dados requisitados no CadastroTemporarioPacienteDTO',
        type: CadastroTemporarioPacienteDTO
      })
    @ApiOkResponse({ description: 'O recurso foi atualizado com sucesso!' })
    @ApiNotFoundResponse({ description: 'Recurso não encontrado!' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
    @Put('/paciente')
    @HttpCode(HttpStatus.OK)
    updatePaciente(@Body() cadastroTemporarioPacienteDTO: CadastroTemporarioPacienteDTO): Promise<Paciente> {
        return this.service.updatePaciente(cadastroTemporarioPacienteDTO)
    }
}