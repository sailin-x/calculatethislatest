import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialAgilityCalculator } from './FinancialAgilityCalculator';

export function registerFinancialAgilityCalculator(): void {
  calculatorRegistry.register(FinancialAgilityCalculator);
}

export { FinancialAgilityCalculator };
