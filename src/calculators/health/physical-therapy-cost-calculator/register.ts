import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PhysicalTherapyCostCalculator } from './PhysicalTherapyCostCalculator';

export function registerPhysicalTherapyCostCalculator(): void {
  calculatorRegistry.register(PhysicalTherapyCostCalculator);
}

export { PhysicalTherapyCostCalculator };
