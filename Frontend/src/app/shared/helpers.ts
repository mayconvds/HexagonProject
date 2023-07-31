export class Helpers {
    public static formatCpf(cpf: string): string {
        const match = cpf.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
        if (match) {
            return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
        }
        return cpf;
    }

    static checkLoginError(messages: any): any {
        if (typeof messages === "object") {
            const array = Object.values(messages);
            if (array.length > 0) {
                const find = array.find((m: any) => m === "Usuário sem permissão");
                if (find) {
                    return true;
                }
            }
        }
        return false;
    }

    static captureError(messages: any): string {
        if (!messages) {
            return "";
        }

        const typ = typeof messages;
        if (typ === "object") {
            const toarray = Object.values(messages);
            return (toarray.length > 0 ? toarray.join("<br>") : "");
        }

        return messages;
    }
    static getLocalities(): any {
        return [
            {city: "São Paulo", state: "SP"},
            {city: "Rio de Janeiro", state: "RJ"},
            {city: "Salvador", state: "BA"},
            {city: "Belo Horizonte", state: "MG"},
            {city: "Fortaleza", state: "CE"},
            {city: "Curitiba", state: "PR"},
            {city: "Manaus", state: "AM"},
            {city: "Recife", state: "PE"},
            {city: "Belém", state: "PA"},
            {city: "Porto Alegre", state: "RS"},
            {city: "Goiânia", state: "GO"},
            {city: "Guarulhos", state: "SP"},
            {city: "Campinas", state: "SP"},
            {city: "São Luís", state: "MA"},
            {city: "São Gonçalo", state: "RJ"},
            {city: "Maceió", state: "AL"},
            {city: "Duque de Caxias", state: "RJ"},
            {city: "Natal", state: "RN"},
            {city: "Campo Grande", state: "MS"},
            {city: "Teresina", state: "PI"}
        ];
    }


}
