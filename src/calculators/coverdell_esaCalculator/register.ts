import { calculatorRegistry } from '../../data/calculatorRegistry';
import { coverdell_esaCalculator } from './coverdell_esaCalculator';

export function registercoverdell_esaCalculator(): void {
  calculatorRegistry.register(new coverdell_esaCalculator());
}
