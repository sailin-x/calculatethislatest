import { calculatorRegistry } from '../../data/calculatorRegistry';
import { souvenir_cost_calculatorCalculatorCalculator } from './souvenir_cost_calculatorCalculatorCalculator';

export function registersouvenir_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new souvenir_cost_calculatorCalculatorCalculator());
}
