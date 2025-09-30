import { calculatorRegistry } from '../../data/calculatorRegistry';
import { cd_interest_calculatorCalculatorCalculator } from './cd_interest_calculatorCalculatorCalculator';

export function registercd_interest_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new cd_interest_calculatorCalculatorCalculator());
}
