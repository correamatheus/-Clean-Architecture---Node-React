export interface Familiar {
    id: string,
    nome: string,
    dataNascimentoISO: string,
    idPai: string | null
}

export interface CreateFamiliarDto {
    nome: string;
    dataNascimentoISO: string;
    idPai?: string | null;
}