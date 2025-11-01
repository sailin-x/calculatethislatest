import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_pointsCalculator } from './mortgage_pointsCalculator';

export function registermortgage_pointsCalculator(): void {
  calculatorRegistry.register(new mortgage_pointsCalculator());
}
