import { Familiar, FamiliarProps } from "../../domain/entities/Familiar";
import { IFamiliarRepository } from "../../ports/IFamiliarRepository";

export class InMemoryFamiliarRepository implements IFamiliarRepository {
    private itens: Familiar[] = [];
    
    async create(familiar: Familiar): Promise<Familiar> {
        this.itens.push(familiar);
        return familiar;
    }
    async findById(id: string): Promise<Familiar | null> {
        const item = this.itens.find((familiar) => familiar.id === id) ?? null;
        return item;
    }
    async findAll(): Promise<Familiar[]> {
        return this.itens.slice();
    }
    async update(id: string, partial: Partial<ReturnType<Familiar["toJSON"]>>): Promise<Familiar | null> {
        const idx = this.itens.findIndex((familiar) => familiar.id == id);
        if(idx === -1 ) return null;
        const itemAtual =  this.itens[idx];
        const iteMergiado: FamiliarProps = { ...itemAtual.toJSON(), ...partial };
        const itemAtualizado = new Familiar(iteMergiado);
        this.itens[idx] = itemAtualizado;
        return itemAtualizado;
    }
    async delete(id: string): Promise<boolean> {
        const listAnteriorItens = this.itens.length;
        this.itens = this.itens.filter((familiar) => familiar.id !== id);
        return this.itens.length < listAnteriorItens;
    }

}