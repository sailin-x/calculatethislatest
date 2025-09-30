import { calculatorRegistry } from '../../data/calculatorRegistry';
import { EbitdaCalculatorCalculator } from './EbitdaCalculatorCalculator';

export function registerEbitdaCalculatorCalculator(): void {
  calculatorRegistry.register(new EbitdaCalculatorCalculator());
}
