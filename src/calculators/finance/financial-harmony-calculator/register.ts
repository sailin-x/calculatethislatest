import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialHarmonyCalculator } from './FinancialHarmonyCalculator';

export function registerFinancialHarmonyCalculator(): void {
  calculatorRegistry.register(FinancialHarmonyCalculator);
}

export { FinancialHarmonyCalculator };
