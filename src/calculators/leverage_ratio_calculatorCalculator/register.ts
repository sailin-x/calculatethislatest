import { calculatorRegistry } from '../../data/calculatorRegistry';
import { leverage_ratio_calculatorCalculatorCalculator } from './leverage_ratio_calculatorCalculatorCalculator';

export function registerleverage_ratio_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new leverage_ratio_calculatorCalculatorCalculator());
}
