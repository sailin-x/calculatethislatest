import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialExcellenceCalculator } from './FinancialExcellenceCalculator';

export function registerFinancialExcellenceCalculator(): void {
  calculatorRegistry.register(FinancialExcellenceCalculator);
}

export { FinancialExcellenceCalculator };
