import { calculatorRegistry } from '../../data/calculatorRegistry';
import { condo_insuranceCalculatorCalculator } from './condo_insuranceCalculatorCalculator';

export function registercondo_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new condo_insuranceCalculatorCalculator());
}
