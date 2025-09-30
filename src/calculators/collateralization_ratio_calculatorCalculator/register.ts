import { calculatorRegistry } from '../../data/calculatorRegistry';
import { collateralization_ratio_calculatorCalculatorCalculator } from './collateralization_ratio_calculatorCalculatorCalculator';

export function registercollateralization_ratio_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new collateralization_ratio_calculatorCalculatorCalculator());
}
