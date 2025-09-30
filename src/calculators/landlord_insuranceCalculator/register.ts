import { calculatorRegistry } from '../../data/calculatorRegistry';
import { landlord_insuranceCalculatorCalculator } from './landlord_insuranceCalculatorCalculator';

export function registerlandlord_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new landlord_insuranceCalculatorCalculator());
}
