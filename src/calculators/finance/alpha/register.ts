import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AlphaCalculator } from './AlphaCalculator';

export function registerAlphaCalculator() {
  calculatorRegistry.register(AlphaCalculator);
}
