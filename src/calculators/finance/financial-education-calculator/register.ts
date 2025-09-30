import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialEducationCalculator } from './FinancialEducationCalculator';

export function registerFinancialEducationCalculator(): void {
  calculatorRegistry.register(FinancialEducationCalculator);
}

export { FinancialEducationCalculator };
