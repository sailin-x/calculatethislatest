import { calculatorRegistry } from '../../data/calculatorRegistry';
import { biological_age_calculatorCalculatorCalculator } from './biological_age_calculatorCalculatorCalculator';

export function registerbiological_age_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new biological_age_calculatorCalculatorCalculator());
}
