import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPensionLumpSumVsAnnuityCalculator } from './registerPensionLumpSumVsAnnuityCalculator';

export function registerregisterPensionLumpSumVsAnnuityCalculator(): void {
  calculatorRegistry.register(new registerPensionLumpSumVsAnnuityCalculator());
}
