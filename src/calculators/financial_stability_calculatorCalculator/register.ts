import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_stability_calculatorCalculatorCalculator } from './financial_stability_calculatorCalculatorCalculator';

export function registerfinancial_stability_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_stability_calculatorCalculatorCalculator());
}
