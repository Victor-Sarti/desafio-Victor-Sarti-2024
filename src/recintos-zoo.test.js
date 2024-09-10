import { RecintosZoo } from './recintos-zoo.js';

describe('RecintosZoo', () => {
  let zoo;

  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  test('deve retornar erro para animal inválido', () => {
    const result = zoo.analisaRecintos('UNICORNIO', 1);
    expect(result).toEqual({ erro: 'Animal inválido' });
  });

  test('deve retornar erro para quantidade inválida', () => {
    const result = zoo.analisaRecintos('MACACO', -1);
    expect(result).toEqual({ erro: 'Quantidade inválida' });
  });

  test('deve retornar recintos viáveis para 2 macacos', () => {
    const result = zoo.analisaRecintos('MACACO', 2);
    expect(result).toEqual({
      recintosViaveis: [
        "Recinto 1 (espaço livre: 5 total: 10)",
        "Recinto 2 (espaço livre: 3 total: 5)",
        "Recinto 3 (espaço livre: 2 total: 7)"
      ]
    });
  });

  test('deve retornar recintos viáveis para 1 leão', () => {
    const result = zoo.analisaRecintos('LEAO', 1);
    expect(result).toEqual({
      recintosViaveis: [
        "Recinto 5 (espaço livre: 6 total: 9)"
      ]
    });
  });

  test('deve retornar erro se não houver recinto viável', () => {
    const result = zoo.analisaRecintos('HIPOPOTAMO', 1);
    expect(result).toEqual({ erro: 'Não há recinto viável' });
  });

  test('não deve permitir carnívoros habitando com outra espécie', () => {
    const result = zoo.analisaRecintos('LEOPARDO', 1);
    expect(result).toEqual({ erro: 'Não há recinto viável' });
  });

  test('deve permitir hipopótamos no recinto savana e rio', () => {
    const result = zoo.analisaRecintos('HIPOPOTAMO', 1);
    expect(result).toEqual({
      recintosViaveis: [
        "Recinto 3 (espaço livre: 3 total: 7)"
      ]
    });
  });

  test('deve garantir que o macaco não fique sozinho', () => {
    const result = zoo.analisaRecintos('MACACO', 1);
    expect(result).toEqual({
      recintosViaveis: [
        "Recinto 1 (espaço livre: 6 total: 10)",
        "Recinto 3 (espaço livre: 4 total: 7)"
      ]
    });
  });
});
