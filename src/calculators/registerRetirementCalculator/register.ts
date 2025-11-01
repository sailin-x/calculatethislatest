import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerRetirementCalculator } from './registerRetirementCalculator';

export function registerregisterRetirementCalculator(): void {
  calculatorRegistry.register(new registerRetirementCalculator());
}
