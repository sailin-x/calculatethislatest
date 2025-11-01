import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCostOfDebtCalculator } from './registerCostOfDebtCalculator';

export function registerregisterCostOfDebtCalculator(): void {
  calculatorRegistry.register(new registerCostOfDebtCalculator());
}
