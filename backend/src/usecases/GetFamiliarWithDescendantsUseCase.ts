import { Familiar } from "../domain/entities/Familiar";
import { IFamiliarRepository } from "../ports/IFamiliarRepository";

export class GetFamiliarWithDescendantsUseCase {
    constructor(private repository: IFamiliarRepository){}
    async execute(id: string): Promise<{ familiar: Familiar; descendentes: Familiar[] } | null>{
        const familia = await this.repository.findById(id);
        if(!familia) return null

        const familiasCompletas = await this.repository.findAll();
        const descendentes = familiasCompletas.filter((familia) => familia.idPai === id);
        return {familiar: familia, descendentes}
    }
}