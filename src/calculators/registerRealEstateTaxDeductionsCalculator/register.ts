import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateTaxDeductionsCalculatorCalculator } from './registerRealEstateTaxDeductionsCalculatorCalculator';

export function registerregisterRealEstateTaxDeductionsCalculatorCalculator(): void {
  calculatorRegistry.register(new registerRealEstateTaxDeductionsCalculatorCalculator());
}
