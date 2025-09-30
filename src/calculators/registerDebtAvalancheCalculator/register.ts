import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDebtAvalancheCalculatorCalculator } from './registerDebtAvalancheCalculatorCalculator';

export function registerregisterDebtAvalancheCalculatorCalculator(): void {
  calculatorRegistry.register(new registerDebtAvalancheCalculatorCalculator());
}
