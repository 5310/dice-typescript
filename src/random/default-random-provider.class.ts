import { RandomProvider } from './random-provider.class';
import { MersenneTwister19937, Engine, integer } from 'random-js';

export class DefaultRandomProvider implements RandomProvider {
  private engine: Engine;

  constructor() {
    this.engine = MersenneTwister19937.autoSeed();
  }

  numberBetween(min: number, max: number) {
    const distribution = integer(min, max);
    return distribution(this.engine);
  }
}
