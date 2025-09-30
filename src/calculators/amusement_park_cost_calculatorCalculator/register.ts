import { calculatorRegistry } from '../../data/calculatorRegistry';
import { amusement_park_cost_calculatorCalculatorCalculator } from './amusement_park_cost_calculatorCalculatorCalculator';

export function registeramusement_park_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new amusement_park_cost_calculatorCalculatorCalculator());
}
