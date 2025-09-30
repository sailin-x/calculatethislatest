import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CriticalIllnessCalculator } from './CriticalIllnessCalculator';

export function registerCriticalIllnessCalculator(): void {
  calculatorRegistry.register(CriticalIllnessCalculator);
}

export { CriticalIllnessCalculator };
