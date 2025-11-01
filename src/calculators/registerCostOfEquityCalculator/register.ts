import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCostOfEquityCalculator } from './registerCostOfEquityCalculator';

export function registerregisterCostOfEquityCalculator(): void {
  calculatorRegistry.register(new registerCostOfEquityCalculator());
}
