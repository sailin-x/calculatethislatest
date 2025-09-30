import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CostOfDebtCalculator } from './CostOfDebtCalculator';

export function registerCostOfDebtCalculator(): void {
  calculatorRegistry.register(CostOfDebtCalculator);
}

export { CostOfDebtCalculator };
