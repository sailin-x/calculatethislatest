import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialMasteryCalculator } from './FinancialMasteryCalculator';

export function registerFinancialMasteryCalculator(): void {
  calculatorRegistry.register(FinancialMasteryCalculator);
}

export { FinancialMasteryCalculator };
