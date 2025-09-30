import { calculatorRegistry } from '../../data/calculatorRegistry';
import { amortizationCalculatorCalculator } from './amortizationCalculatorCalculator';

export function registeramortizationCalculatorCalculator(): void {
  calculatorRegistry.register(new amortizationCalculatorCalculator());
}
