import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialPeaceCalculator } from './FinancialPeaceCalculator';

export function registerFinancialPeaceCalculator(): void {
  calculatorRegistry.register(FinancialPeaceCalculator);
}

export { FinancialPeaceCalculator };
