import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { selfStorageFacilityROICalculator } from './SelfStorageFacilityROICalculator';

/**
 * Register the Self-Storage Facility ROI Calculator
 */
export function registerSelfStorageFacilityROICalculator(): void {
  calculatorRegistry.register(selfStorageFacilityROICalculator);
}