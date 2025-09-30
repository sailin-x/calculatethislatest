import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MedicalExpenseTaxDeductionCalculator } from './MedicalExpenseTaxDeductionCalculator';

export function registerMedicalExpenseTaxDeductionCalculator(): void {
  calculatorRegistry.register(MedicalExpenseTaxDeductionCalculator);
}

export { MedicalExpenseTaxDeductionCalculator };
