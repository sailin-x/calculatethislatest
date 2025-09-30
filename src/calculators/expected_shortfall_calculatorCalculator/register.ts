import { calculatorRegistry } from '../../data/calculatorRegistry';
import { expected_shortfall_calculatorCalculatorCalculator } from './expected_shortfall_calculatorCalculatorCalculator';

export function registerexpected_shortfall_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new expected_shortfall_calculatorCalculatorCalculator());
}
