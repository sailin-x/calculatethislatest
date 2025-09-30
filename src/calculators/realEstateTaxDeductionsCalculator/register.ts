import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realEstateTaxDeductionsCalculatorCalculator } from './realEstateTaxDeductionsCalculatorCalculator';

export function registerrealEstateTaxDeductionsCalculatorCalculator(): void {
  calculatorRegistry.register(new realEstateTaxDeductionsCalculatorCalculator());
}
