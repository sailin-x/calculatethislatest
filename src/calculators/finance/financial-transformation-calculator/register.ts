import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { FinancialTransformationCalculator } from './FinancialTransformationCalculator';

export function registerFinancialTransformationCalculator(): void {
  calculatorRegistry.register(FinancialTransformationCalculator);
}

export { FinancialTransformationCalculator };
