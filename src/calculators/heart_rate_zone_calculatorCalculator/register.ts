import { calculatorRegistry } from '../../data/calculatorRegistry';
import { heart_rate_zone_calculatorCalculatorCalculator } from './heart_rate_zone_calculatorCalculatorCalculator';

export function registerheart_rate_zone_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new heart_rate_zone_calculatorCalculatorCalculator());
}
