import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerCostOfDebtCalculatorCalculator } from './registerCostOfDebtCalculatorCalculator';

export function registerregisterCostOfDebtCalculatorCalculator(): void {
  calculatorRegistry.register(new registerCostOfDebtCalculatorCalculator());
}
