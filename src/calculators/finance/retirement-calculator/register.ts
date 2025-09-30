import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { retirementCalculator } from './RetirementCalculator';

export function registerRetirementCalculator(): void {
  calculatorRegistry.register(retirementCalculator);
}