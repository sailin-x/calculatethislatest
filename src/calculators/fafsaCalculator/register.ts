import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fafsaCalculatorCalculator } from './fafsaCalculatorCalculator';

export function registerfafsaCalculatorCalculator(): void {
  calculatorRegistry.register(new fafsaCalculatorCalculator());
}
