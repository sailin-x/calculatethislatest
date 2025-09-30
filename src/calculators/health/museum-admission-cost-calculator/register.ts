import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MuseumAdmissionCostCalculator } from './MuseumAdmissionCostCalculator';

export function registerMuseumAdmissionCostCalculator(): void {
  calculatorRegistry.register(MuseumAdmissionCostCalculator);
}

export { MuseumAdmissionCostCalculator };
