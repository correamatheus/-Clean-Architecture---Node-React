import { randomUUID } from "crypto";
import { Familiar } from "../domain/entities/Familiar";
import { IFamiliarRepository } from "../ports/IFamiliarRepository";
import { FamiliarDTO } from "../types/familiar.types";
import { HttpError } from "../shared/HttpError";

export class EditFamiliarUseCase {
    constructor(private repository: IFamiliarRepository){}
    async execute(id: string, partial: Partial<ReturnType<Familiar['toJSON']>>): Promise<Familiar> {
        const current = await this.repository.findById(id);
        if (!current) {
            throw new HttpError(404, 'Familiar não encontrado');
        }
        const mergedProps = { ...current.toJSON(), ...partial };
        const updatedEntity = new Familiar(mergedProps);
        const updated = await this.repository.update(id, updatedEntity.toJSON());
        if (!updated) {
        throw new HttpError(500, 'Erro ao atualizar familiar');
        }
        return updated;
    }
}

