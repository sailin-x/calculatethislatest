import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialPerformanceCalculator } from './FinancialPerformanceCalculator';

export function registerFinancialPerformanceCalculator(): void {
  calculatorRegistry.register(FinancialPerformanceCalculator);
}

export { FinancialPerformanceCalculator };
