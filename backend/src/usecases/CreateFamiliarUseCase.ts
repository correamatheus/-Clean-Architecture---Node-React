import { randomUUID } from "crypto";
import { Familiar } from "../domain/entities/Familiar";
import { IFamiliarRepository } from "../ports/IFamiliarRepository";
import { FamiliarDTO } from "../types/familiar.types";

export class CreateFamiliarUseCase {
    constructor(private repository: IFamiliarRepository){}
    async execute(dto: FamiliarDTO){
        const entity = new Familiar({
            id: randomUUID(),
            nome: dto.nome,
            dataNascimentoISO: dto.dataNascimentoISO,
            identidade: dto.identidade,
            idPai: dto.idPai ?? null
        })

        const familiaCriada = this.repository.create(entity);
        return familiaCriada;
    }
}

