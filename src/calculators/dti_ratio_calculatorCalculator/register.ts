import { calculatorRegistry } from '../../data/calculatorRegistry';
import { dti_ratio_calculatorCalculatorCalculator } from './dti_ratio_calculatorCalculatorCalculator';

export function registerdti_ratio_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new dti_ratio_calculatorCalculatorCalculator());
}
