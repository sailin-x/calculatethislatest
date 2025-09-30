import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialLiteracyCalculator } from './FinancialLiteracyCalculator';

export function registerFinancialLiteracyCalculator(): void {
  calculatorRegistry.register(FinancialLiteracyCalculator);
}

export { FinancialLiteracyCalculator };
