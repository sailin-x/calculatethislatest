import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DogecoinMiningCalculator } from './DogecoinMiningCalculator';

export function registerDogecoinMiningCalculator(): void {
  calculatorRegistry.register(DogecoinMiningCalculator);
}

export { DogecoinMiningCalculator };
