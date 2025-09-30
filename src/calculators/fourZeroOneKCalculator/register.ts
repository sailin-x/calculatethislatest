import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fourZeroOneKCalculatorCalculator } from './fourZeroOneKCalculatorCalculator';

export function registerfourZeroOneKCalculatorCalculator(): void {
  calculatorRegistry.register(new fourZeroOneKCalculatorCalculator());
}
