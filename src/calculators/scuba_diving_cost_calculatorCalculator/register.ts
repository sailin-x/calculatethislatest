import { calculatorRegistry } from '../../data/calculatorRegistry';
import { scuba_diving_cost_calculatorCalculatorCalculator } from './scuba_diving_cost_calculatorCalculatorCalculator';

export function registerscuba_diving_cost_calculatorCalculatorCalculator(): void {
  calculatorRegistry.register(new scuba_diving_cost_calculatorCalculatorCalculator());
}
