export interface Familiar {
    id: string,
    nome: string,
    dataNascimentoISO: string,
    identidade: string,
    idPai: string | null
}

export interface CreateFamiliarDto {
    nome: string;
    dataNascimentoISO: string;
    identidade: string;
    idPai?: string | null;
}