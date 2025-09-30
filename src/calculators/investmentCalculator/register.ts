import { calculatorRegistry } from '../../data/calculatorRegistry';
import { investmentCalculatorCalculator } from './investmentCalculatorCalculator';

export function registerinvestmentCalculatorCalculator(): void {
  calculatorRegistry.register(new investmentCalculatorCalculator());
}
