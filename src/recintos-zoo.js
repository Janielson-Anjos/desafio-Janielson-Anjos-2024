class RecintosZoo {
  constructor() {
    this.recintos = [
      {
        numero: 1,
        bioma: ["savana"],
        tamanhoTotal: 10,
        animais: [{ especie: "MACACO", quantidade: 3 }],
      },
      { numero: 2, bioma: ["floresta"], tamanhoTotal: 5, animais: [] },
      {
        numero: 3,
        bioma: ["savana", "rio"],
        tamanhoTotal: 7,
        animais: [{ especie: "GAZELA", quantidade: 1 }],
      },
      { numero: 4, bioma: ["rio"], tamanhoTotal: 8, animais: [] },
      {
        numero: 5,
        bioma: ["savana"],
        tamanhoTotal: 9,
        animais: [{ especie: "LEAO", quantidade: 1 }],
      },
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ["savana", "rio"], carnivoro: false },
    };
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const infoAnimal = this.animais[animal];

    const recintosViaveis = [];

    this.recintos.forEach((recinto) => {
      const espacoOcupado = recinto.animais.reduce(
        (sum, a) => sum + a.quantidade * this.animais[a.especie].tamanho,
        0
      );
      const espacoRestante = recinto.tamanhoTotal - espacoOcupado;

      const biomaCompativel = infoAnimal.biomas.some((bioma) =>
        recinto.bioma.includes(bioma)
      );
      if (!biomaCompativel) {
        return;
      }

      let espacoNecessario = infoAnimal.tamanho * quantidade;

      const temOutrasEspecies = recinto.animais.some(
        (a) => a.especie !== animal
      );

      if (temOutrasEspecies) {
        espacoNecessario += 1;
      }

      if (espacoRestante < espacoNecessario) {
        return;
      }

      if (infoAnimal.carnivoro && temOutrasEspecies) {
        return;
      }

      if (
        animal === "HIPOPOTAMO" &&
        !(recinto.bioma.includes("savana") && recinto.bioma.includes("rio"))
      ) {
        return;
      }

      if (
        animal === "MACACO" &&
        quantidade === 1 &&
        recinto.animais.length === 0
      ) {
        return;
      }

      recintosViaveis.push({
        recintoNumero: recinto.numero,
        espacoLivre: espacoRestante - espacoNecessario,
        espacoTotal: recinto.tamanhoTotal,
      });
    });

    recintosViaveis.sort((a, b) => a.recintoNumero - b.recintoNumero);

    if (recintosViaveis.length > 3) {
      recintosViaveis.length = 3;
    }

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return {
      recintosViaveis: recintosViaveis.map(
        (r) =>
          `Recinto ${r.recintoNumero} (espaço livre: ${r.espacoLivre} total: ${r.espacoTotal})`
      ),
    };
  }
}

export { RecintosZoo as RecintosZoo };
