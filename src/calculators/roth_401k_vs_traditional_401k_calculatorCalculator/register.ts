import { calculatorRegistry } from '../../data/calculatorRegistry';
import { roth_401k_vs_traditional_401k_calculatorCalculatorCalculator } from './roth_401k_vs_traditional_401k_calculatorCalculatorCalculator';

export function registerroth_401k_vs_traditional_401k_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new roth_401k_vs_traditional_401k_calculatorCalculatorCalculator());
}
