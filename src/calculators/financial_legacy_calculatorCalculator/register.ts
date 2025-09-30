import { calculatorRegistry } from '../../data/calculatorRegistry';
import { financial_legacy_calculatorCalculatorCalculator } from './financial_legacy_calculatorCalculatorCalculator';

export function registerfinancial_legacy_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new financial_legacy_calculatorCalculatorCalculator());
}
