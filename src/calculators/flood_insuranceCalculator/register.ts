import { calculatorRegistry } from '../../data/calculatorRegistry';
import { flood_insuranceCalculatorCalculator } from './flood_insuranceCalculatorCalculator';

export function registerflood_insuranceCalculatorCalculator(): void {
  calculatorRegistry.register(new flood_insuranceCalculatorCalculator());
}
