import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSelfStorageFacilityROICalculator } from './registerSelfStorageFacilityROICalculator';

export function registerregisterSelfStorageFacilityROICalculator(): void {
  calculatorRegistry.register(new registerSelfStorageFacilityROICalculator());
}
