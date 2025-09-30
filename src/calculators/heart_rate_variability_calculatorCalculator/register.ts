import { calculatorRegistry } from '../../data/calculatorRegistry';
import { heart_rate_variability_calculatorCalculatorCalculator } from './heart_rate_variability_calculatorCalculatorCalculator';

export function registerheart_rate_variability_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new heart_rate_variability_calculatorCalculatorCalculator());
}
