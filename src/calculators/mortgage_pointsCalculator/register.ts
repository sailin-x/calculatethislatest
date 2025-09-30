import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mortgage_pointsCalculatorCalculator } from './mortgage_pointsCalculatorCalculator';

export function registermortgage_pointsCalculatorCalculator(): void {
  calculatorRegistry.register(new mortgage_pointsCalculatorCalculator());
}
