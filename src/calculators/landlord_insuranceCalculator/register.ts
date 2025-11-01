import { calculatorRegistry } from '../../data/calculatorRegistry';
import { landlord_insuranceCalculator } from './landlord_insuranceCalculator';

export function registerlandlord_insuranceCalculator(): void {
  calculatorRegistry.register(new landlord_insuranceCalculator());
}
