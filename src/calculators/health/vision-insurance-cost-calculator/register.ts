import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VisionInsuranceCostCalculator } from './VisionInsuranceCostCalculator';

export function registerVisionInsuranceCostCalculator(): void {
  calculatorRegistry.register(VisionInsuranceCostCalculator);
}

export { VisionInsuranceCostCalculator };
