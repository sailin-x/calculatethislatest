import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateTaxDeductionsCalculator } from './realEstateTaxDeductionsCalculator';

export function registerrealEstateTaxDeductionsCalculator(): void {
  calculatorRegistry.register(new realEstateTaxDeductionsCalculator());
}
