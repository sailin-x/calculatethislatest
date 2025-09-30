import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EmploymentPracticesCalculator } from './EmploymentPracticesCalculator';

export function registerEmploymentPracticesCalculator(): void {
  calculatorRegistry.register(EmploymentPracticesCalculator);
}

export { EmploymentPracticesCalculator };
