import { calculatorRegistry } from '../../data/calculatorRegistry';
import { debtconsolidationloancalculatorCalculator } from './debtconsolidationloancalculatorCalculator';

export function registerdebtconsolidationloancalculatorCalculator(): void {
  calculatorRegistry.register(new debtconsolidationloancalculatorCalculator());
}
