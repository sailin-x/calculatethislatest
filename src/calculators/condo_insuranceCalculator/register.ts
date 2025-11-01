import { calculatorRegistry } from '../../data/calculatorRegistry';
import { condo_insuranceCalculator } from './condo_insuranceCalculator';

export function registercondo_insuranceCalculator(): void {
  calculatorRegistry.register(new condo_insuranceCalculator());
}
