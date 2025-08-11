import { Familiar } from "../domain/entities/Familiar";

export interface IFamiliarRepository {
    create(familiar: Familiar): Promise<Familiar>;
    findById(id: string): Promise<Familiar | null>;
    findAll(): Promise<Familiar[]>;
    update(id: string, partial: Partial<ReturnType<Familiar['toJSON']>>): Promise<Familiar | null>;
    delete(id: string): Promise<boolean>;
}