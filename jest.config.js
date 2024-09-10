export default {
  transform: {
    '^.+\\.js$': 'babel-jest', // Transforma arquivos .js usando Babel
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Resolve caminhos relativos
  },
};
