import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialAlignmentCalculator } from './FinancialAlignmentCalculator';

export function registerFinancialAlignmentCalculator(): void {
  calculatorRegistry.register(FinancialAlignmentCalculator);
}

export { FinancialAlignmentCalculator };
