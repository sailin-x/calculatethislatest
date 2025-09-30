import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MedicalDeviceRoyaltyRateCalculator } from './MedicalDeviceRoyaltyRateCalculator';

export function registerMedicalDeviceRoyaltyRateCalculator(): void {
  calculatorRegistry.register(MedicalDeviceRoyaltyRateCalculator);
}

export { MedicalDeviceRoyaltyRateCalculator };
