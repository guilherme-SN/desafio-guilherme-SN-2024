class RecintosZoo {

    constructor() {
        this.animais = {
            "LEAO": { 
                tamanho: 3, 
                biomas: ["SAVANA"], 
                isCarnivoro: true 
            },
            "LEOPARDO": { 
                tamanho: 2, 
                biomas: ["SAVANA"], 
                isCarnivoro: true 
            },
            "CROCODILO": { 
                tamanho: 3, 
                biomas: ["RIO"], 
                isCarnivoro: true 
            },
            "MACACO": { 
                tamanho: 1, 
                biomas: ["SAVANA", "FLORESTA"], 
                isCarnivoro: false 
            },
            "GAZELA": { 
                tamanho: 2, 
                biomas: ["SAVANA"], 
                isCarnivoro: false 
            },
            "HIPOPOTAMO": { 
                tamanho: 4, 
                biomas: ["SAVANA", "RIO"], 
                isCarnivoro: false 
            }
        };

        this.recintos = [
            {
                numero: 1, 
                biomas: ["SAVANA"],
                tamanhoTotal: 10,
                animaisExistentes: [{especie: "MACACO", quantidade: 3}]
            },
            {
                numero: 2, 
                biomas: ["FLORESTA"],
                tamanhoTotal: 5,
                animaisExistentes: [] 
            },
            {
                numero: 3, 
                biomas: ["SAVANA", "RIO"],
                tamanhoTotal: 7,
                animaisExistentes: [{especie: "GAZELA", quantidade: 1}]
            },
            {
                numero: 4, 
                biomas: ["RIO"],
                tamanhoTotal: 8,
                animaisExistentes: [] 
            },
            {
                numero: 5, 
                biomas: ["SAVANA"],
                tamanhoTotal: 9,
                animaisExistentes: [{especie: "LEAO", quantidade: 1}]
            }
        ];
    }


    analisaRecintos(animal, quantidade) {
        if (quantidade <= 0) {
            return {erro: "Quantidade inválida"}
        }

        if (!this.animais[animal]) {
            return {erro: "Animal inválido"}
        }

        const recintosViaveis = []
        const informacoesAnimal = this.animais[animal];

        for (const recinto of this.recintos) {
            if (!this.isBiomaValido(recinto.biomas, informacoesAnimal.biomas)) continue;
            if (!this.hasClassificacaoAlimentarCompativel(recinto.animaisExistentes, animal)) continue;

            if (animal === "HIPOPOTAMO" && 
                this.hasEspecieDiferente(recinto.animaisExistentes, animal) &&
                !recinto.biomas.includes("SAVANA", "RIO")) continue;

            const totalAnimaisNoRecinto = this.calculaTotalAnimaisNoRecinto(recinto.animaisExistentes);
            if (animal === "MACACO" && 
                quantidade === 1 && 
                totalAnimaisNoRecinto === 0) continue;
            
            const espacoLivre = recinto.tamanhoTotal - this.calculaEspacoOcupado(recinto.animaisExistentes);
            
            let espacoNecessario = this.calculaEspacoNecessario(informacoesAnimal, quantidade);
            if (this.hasEspecieDiferente(recinto.animaisExistentes, animal)) espacoNecessario += 1;

            if (espacoLivre >= espacoNecessario) {
                const espacoFinal = espacoLivre - espacoNecessario;
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoFinal} total: ${recinto.tamanhoTotal})`)
            }
        }

        if (recintosViaveis.length == 0) return {erro: "Não há recinto viável"};

        return {recintosViaveis};
    }


    isBiomaValido(biomasRecinto, biomasAnimal) {
        for (const biomaRecinto of biomasRecinto) {
            if (biomasAnimal.includes(biomaRecinto)) return true;
        }

        return false;
    }


    hasClassificacaoAlimentarCompativel(animaisNoRecinto, animal) {
        for (const animalRecinto of animaisNoRecinto) {
            if ((this.animais[animalRecinto.especie].isCarnivoro 
                || this.animais[animal].isCarnivoro) && animalRecinto.especie !== animal) {
                return false;
            }
        }

        return true;
    }


    calculaTotalAnimaisNoRecinto(animaisNoRecinto) {
        let totalAnimais = 0;
        for (const animal of animaisNoRecinto) {
            totalAnimais += animal.quantidade;
        }

        return totalAnimais;
    }

    
    calculaEspacoOcupado(animaisNoRecinto) {
        let totalOcupado = 0;

        for (const animal of animaisNoRecinto) {
            totalOcupado += this.animais[animal.especie].tamanho * animal.quantidade;
        }

        return totalOcupado;
    }


    hasEspecieDiferente(animaisNoRecinto, animal) {
        for (const animalRecinto of animaisNoRecinto) {
            if (animalRecinto.especie !== animal) {
                return true;
            }
        }

        return false;
    }


    calculaEspacoNecessario(informacoesAnimal, quantidade) {
        return informacoesAnimal.tamanho * quantidade;
    }
}

export { RecintosZoo as RecintosZoo };

