import { calculatorRegistry } from '../../data/calculatorRegistry';
import { CostOfDebtCalculatorCalculator } from './CostOfDebtCalculatorCalculator';

export function registerCostOfDebtCalculatorCalculator(): void {
  calculatorRegistry.register(new CostOfDebtCalculatorCalculator());
}
