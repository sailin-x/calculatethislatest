import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gross_rent_multiplierCalculatorCalculator } from './gross_rent_multiplierCalculatorCalculator';

export function registergross_rent_multiplierCalculatorCalculator(): void {
  calculatorRegistry.register(new gross_rent_multiplierCalculatorCalculator());
}
