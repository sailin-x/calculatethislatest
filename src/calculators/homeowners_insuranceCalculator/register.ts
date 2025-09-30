import { calculatorRegistry } from '../../data/calculatorRegistry';
import { homeowners_insuranceCalculatorCalculator } from './homeowners_insuranceCalculatorCalculator';

export function registerhomeowners_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new homeowners_insuranceCalculatorCalculator());
}
