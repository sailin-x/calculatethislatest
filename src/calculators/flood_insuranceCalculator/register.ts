import { calculatorRegistry } from '../../data/calculatorRegistry';
import { flood_insuranceCalculator } from './flood_insuranceCalculator';

export function registerflood_insuranceCalculator(): void {
  calculatorRegistry.register(new flood_insuranceCalculator());
}
