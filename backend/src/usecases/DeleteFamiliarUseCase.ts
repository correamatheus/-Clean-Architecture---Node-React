import { Familiar } from "../domain/entities/Familiar";
import { IFamiliarRepository } from "../ports/IFamiliarRepository";
import { FamiliarDTO } from "../types/familiar.types";
import { HttpError } from "../shared/HttpError";

export class DeleteFamiliarUseCase {
    constructor(private repository: IFamiliarRepository){}
    async execute(id: string): Promise<boolean> {
        const current = await this.repository.findById(id);
        if (!current) {
            throw new HttpError(404, 'Familiar não encontrado');
        }
        const all = await this.repository.findAll();
        if (all.filter(f => f.idPai === id).length > 0) {
            throw new HttpError(400, 'Não é possível excluir um familiar que possui descendentes');
        }
        const updated = await this.repository.delete(id);
        if (!updated) {
            throw new HttpError(500, 'Erro ao excluir familiar');
        } 
        return updated;
    }
}

