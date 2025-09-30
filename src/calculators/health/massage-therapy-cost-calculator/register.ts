import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MassageTherapyCostCalculator } from './MassageTherapyCostCalculator';

export function registerMassageTherapyCostCalculator(): void {
  calculatorRegistry.register(MassageTherapyCostCalculator);
}

export { MassageTherapyCostCalculator };
