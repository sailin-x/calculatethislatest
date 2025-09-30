import { calculatorRegistry } from '../../data/calculatorRegistry';
import { selfStorageFacilityROICalculatorCalculator } from './selfStorageFacilityROICalculatorCalculator';

export function registerselfStorageFacilityROICalculatorCalculator(): void {
  calculatorRegistry.register(new selfStorageFacilityROICalculatorCalculator());
}
