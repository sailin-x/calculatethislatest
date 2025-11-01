import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CostOfEquityCalculator } from './CostOfEquityCalculator';

export function registerCostOfEquityCalculator(): void {
  calculatorRegistry.register(new CostOfEquityCalculator());
}
