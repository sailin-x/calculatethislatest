import { calculatorRegistry } from '../../data/calculatorRegistry';
import { gross_rent_multiplierCalculator } from './gross_rent_multiplierCalculator';

export function registergross_rent_multiplierCalculator(): void {
  calculatorRegistry.register(new gross_rent_multiplierCalculator());
}
