export interface FamiliarDTO {
    nome: string,
    dataNascimentoISO: string,
    identidade: string,
    idPai?: string | null
}

export interface UpdateFamiliarDTO {
    nome?: string;
    dataNascimentoISO?: string;
    identidade?: string;
    idPai?: string | null;
}