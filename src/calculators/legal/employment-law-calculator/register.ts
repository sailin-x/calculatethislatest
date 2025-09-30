import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EmploymentLawCalculator } from './EmploymentLawCalculator';

export function registerEmploymentLawCalculator(): void {
  calculatorRegistry.register(EmploymentLawCalculator);
}

export { EmploymentLawCalculator };
