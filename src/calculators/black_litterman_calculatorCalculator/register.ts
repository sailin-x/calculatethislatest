import { calculatorRegistry } from '../../data/calculatorRegistry';
import { black_litterman_calculatorCalculatorCalculator } from './black_litterman_calculatorCalculatorCalculator';

export function registerblack_litterman_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new black_litterman_calculatorCalculatorCalculator());
}
