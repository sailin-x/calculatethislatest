import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CostOfEquityCalculatorCalculator } from './CostOfEquityCalculatorCalculator';

export function registerCostOfEquityCalculatorCalculator(): void {
  calculatorRegistry.register(new CostOfEquityCalculatorCalculator());
}
