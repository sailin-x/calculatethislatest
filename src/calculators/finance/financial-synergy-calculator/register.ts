import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialSynergyCalculator } from './FinancialSynergyCalculator';

export function registerFinancialSynergyCalculator(): void {
  calculatorRegistry.register(FinancialSynergyCalculator);
}

export { FinancialSynergyCalculator };
