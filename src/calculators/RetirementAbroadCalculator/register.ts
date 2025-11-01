import { calculatorRegistry } from '../../data/calculatorRegistry';
import { RetirementAbroadCalculator } from './RetirementAbroadCalculator';

export function registerRetirementAbroadCalculator(): void {
  calculatorRegistry.register(new RetirementAbroadCalculator());
}
