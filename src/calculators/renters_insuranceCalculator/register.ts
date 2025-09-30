import { calculatorRegistry } from '../../data/calculatorRegistry';
import { renters_insuranceCalculatorCalculator } from './renters_insuranceCalculatorCalculator';

export function registerrenters_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new renters_insuranceCalculatorCalculator());
}
