import { calculatorRegistry } from '../../data/calculatorRegistry';
import { investment_growth_calculatorCalculatorCalculator } from './investment_growth_calculatorCalculatorCalculator';

export function registerinvestment_growth_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new investment_growth_calculatorCalculatorCalculator());
}
