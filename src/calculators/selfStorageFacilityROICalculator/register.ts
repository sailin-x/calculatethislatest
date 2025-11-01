import { calculatorRegistry } from '../../data/calculatorRegistry';
import { selfStorageFacilityROICalculator } from './selfStorageFacilityROICalculator';

export function registerselfStorageFacilityROICalculator(): void {
  calculatorRegistry.register(new selfStorageFacilityROICalculator());
}
