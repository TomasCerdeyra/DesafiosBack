let instance: Colores | null = null;

class Colores {
  private colores: string[] = [];

  constructor() {
    this.colores = [];
  }

  addColor(color: string) {
    this.colores.push(color);
  }

  getColores() {
    return this.colores;
  }

  static getInstance(): Colores {
    if (!instance) {
      instance = new Colores();
    }
    return instance;
  }
}

export default Colores;