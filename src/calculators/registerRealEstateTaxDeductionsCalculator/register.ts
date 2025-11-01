import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRealEstateTaxDeductionsCalculator } from './registerRealEstateTaxDeductionsCalculator';

export function registerregisterRealEstateTaxDeductionsCalculator(): void {
  calculatorRegistry.register(new registerRealEstateTaxDeductionsCalculator());
}
