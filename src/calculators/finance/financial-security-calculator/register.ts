import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialSecurityCalculator } from './FinancialSecurityCalculator';

export function registerFinancialSecurityCalculator(): void {
  calculatorRegistry.register(FinancialSecurityCalculator);
}

export { FinancialSecurityCalculator };
