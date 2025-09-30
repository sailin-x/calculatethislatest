import { calculatorRegistry } from '../../data/calculatorRegistry';
import { coverdell_esaCalculatorCalculator } from './coverdell_esaCalculatorCalculator';

export function registercoverdell_esaCalculatorCalculator(): void {
  calculatorRegistry.register(new coverdell_esaCalculatorCalculator());
}
