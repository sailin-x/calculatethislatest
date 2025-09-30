import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCostOfEquityCalculatorCalculator } from './registerCostOfEquityCalculatorCalculator';

export function registerregisterCostOfEquityCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCostOfEquityCalculatorCalculator());
}
