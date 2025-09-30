import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialGratitudeCalculator } from './FinancialGratitudeCalculator';

export function registerFinancialGratitudeCalculator(): void {
  calculatorRegistry.register(FinancialGratitudeCalculator);
}

export { FinancialGratitudeCalculator };
