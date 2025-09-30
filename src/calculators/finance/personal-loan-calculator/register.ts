import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PersonalLoanCalculator } from './PersonalLoanCalculator';

export function registerPersonalLoanCalculator(): void {
  calculatorRegistry.register(PersonalLoanCalculator);
}

export { PersonalLoanCalculator };
