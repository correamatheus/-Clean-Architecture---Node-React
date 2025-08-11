export interface FamiliarDTO {
    nome: string,
    dataNascimentoISO: string,
    idPai?: string | null
}

export interface UpdateFamiliarDTO {
    nome?: string;
    dataNascimentoISO?: string;
    idPai?: string | null;
}