import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialAnalysisCalculator } from './FinancialAnalysisCalculator';

export function registerFinancialAnalysisCalculator(): void {
  calculatorRegistry.register(FinancialAnalysisCalculator);
}

export { FinancialAnalysisCalculator };
