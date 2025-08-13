export type FamiliarProps = {
    id: string,
    nome: string,
    dataNascimentoISO: string,
    identidade: string,
    idPai?: string | null
}

export class Familiar {
    private props: FamiliarProps;

    constructor(props: FamiliarProps) {
        if (!props.nome || props.nome.trim().length == 0) {
            throw new Error("Nome é obrigatório");
        }

        if (!props.nome || props.nome.trim().length == 0) {
            throw new Error("Identidade é obrigatório");
        }

        if (isNaN(Date.parse(props.dataNascimentoISO))) {
            throw new Error('Data de nascimento inválida');
        }

        this.props = props
    }

    get id(): string{
        return this.props.id;
    }

    get nome(): string {
        return this.props.nome;
    }

    get dataNascimentoISO(): string {
        return this.props.dataNascimentoISO;
    }

    get identidade(): string {
        return this.props.identidade;
    }

    get idPai(): string | null | undefined {
        return this.props.idPai;
    }

    getAgeYears(): number {
        const birth = new Date(this.props.dataNascimentoISO);
        const diff = Date.now() - birth.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    toJSON(): FamiliarProps {
        return { ...this.props };
    }
}