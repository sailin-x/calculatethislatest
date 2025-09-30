import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerSelfStorageFacilityROICalculatorCalculator } from './registerSelfStorageFacilityROICalculatorCalculator';

export function registerregisterSelfStorageFacilityROICalculatorCalculator(): void {
  calculatorRegistry.register(new registerSelfStorageFacilityROICalculatorCalculator());
}
