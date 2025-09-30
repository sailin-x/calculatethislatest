import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialReportingCalculator } from './FinancialReportingCalculator';

export function registerFinancialReportingCalculator(): void {
  calculatorRegistry.register(FinancialReportingCalculator);
}

export { FinancialReportingCalculator };
