import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AcupunctureCostCalculator } from './AcupunctureCostCalculator';

export function registerAcupunctureCostCalculator(): void {
  calculatorRegistry.register(AcupunctureCostCalculator);
}

export { AcupunctureCostCalculator };
