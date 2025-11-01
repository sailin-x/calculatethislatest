import { calculatorRegistry } from '../../data/calculatorRegistry';
import { homeowners_insuranceCalculator } from './homeowners_insuranceCalculator';

export function registerhomeowners_insuranceCalculator(): void {
  calculatorRegistry.register(new homeowners_insuranceCalculator());
}
