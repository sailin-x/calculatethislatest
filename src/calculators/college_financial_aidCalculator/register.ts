import { calculatorRegistry } from '../../data/calculatorRegistry';
import { college_financial_aidCalculator } from './college_financial_aidCalculator';

export function registercollege_financial_aidCalculator(): void {
  calculatorRegistry.register(new college_financial_aidCalculator());
}
