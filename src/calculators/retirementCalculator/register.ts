import { calculatorRegistry } from '../../data/calculatorRegistry';
import { retirementCalculator } from './retirementCalculator';

export function registerretirementCalculator(): void {
  calculatorRegistry.register(new retirementCalculator());
}
