import { calculatorRegistry } from '../../data/calculatorRegistry';
import { amortizationCalculator } from './amortizationCalculator';

export function registeramortizationCalculator(): void {
  calculatorRegistry.register(new amortizationCalculator());
}
