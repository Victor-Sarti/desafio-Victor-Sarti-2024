class RecintosZoo {
    constructor() {
      // Definindo os recintos e animais
      this.recintos = [
        { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
        { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
        { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
        { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
        { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
      ];
  
      this.animaisPermitidos = {
        LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
        LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
        CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
        MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
        GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
        HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
      };
    }
  
    analisaRecintos(especie, quantidade) {
      if (!this.animaisPermitidos[especie]) {
        return { erro: 'Animal inválido' };
      }
    
      if (quantidade <= 0 || !Number.isInteger(quantidade)) {
        return { erro: 'Quantidade inválida' };
      }
    
      const animalInfo = this.animaisPermitidos[especie];
      const tamanhoNecessario = quantidade * animalInfo.tamanho;
      const recintosViaveis = [];
    
      for (let recinto of this.recintos) {
        // Validação do bioma
        if (!animalInfo.biomas.includes(recinto.bioma) && !(animalInfo.biomas.length > 1 && recinto.bioma === 'savana e rio')) {
          continue;
        }
    
        // Cálculo do espaço ocupado e livre
        let espacoOcupado = recinto.animais.reduce((acc, a) => acc + a.quantidade * this.animaisPermitidos[a.especie].tamanho, 0);
        let espacoLivre = recinto.tamanho - espacoOcupado;
    
        // Regra do espaço extra quando há mais de uma espécie
        const maisDeUmaEspecie = recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === especie);
        if (maisDeUmaEspecie) {
          espacoLivre -= 1; // Espaço extra necessário
        }
    
        // Regra dos carnívoros (somente com a própria espécie)
        if (animalInfo.carnivoro && recinto.animais.some(a => a.especie !== especie)) {
          continue;
        }
    
        // Regra dos hipopótamos (somente toleram outras espécies em savana e rio)
        if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
          continue;
        }
    
        // Regra dos macacos (não ficam confortáveis sozinhos)
        if (especie === 'MACACO' && quantidade === 1 && recinto.animais.length === 0) {
          continue;
        }
    
        // Regra de manter o conforto dos animais existentes
        const espacoNecessarioComInclusao = tamanhoNecessario + (maisDeUmaEspecie ? 1 : 0);
        if (espacoNecessarioComInclusao <= espacoLivre) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espacoNecessarioComInclusao} total: ${recinto.tamanho})`);
        }
      }
    
      // Retorno dos resultados
      if (recintosViaveis.length > 0) {
        return { recintosViaveis };
      } else {
        return { erro: 'Não há recinto viável' };
      }
    }
  
    
  
  }
  