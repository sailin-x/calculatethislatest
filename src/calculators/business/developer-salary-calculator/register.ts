import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DeveloperSalaryCalculator } from './DeveloperSalaryCalculator';

export function registerDeveloperSalaryCalculator(): void {
  calculatorRegistry.register(DeveloperSalaryCalculator);
}

export { DeveloperSalaryCalculator };
