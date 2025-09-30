import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialMentoringCalculator } from './FinancialMentoringCalculator';

export function registerFinancialMentoringCalculator(): void {
  calculatorRegistry.register(FinancialMentoringCalculator);
}

export { FinancialMentoringCalculator };
