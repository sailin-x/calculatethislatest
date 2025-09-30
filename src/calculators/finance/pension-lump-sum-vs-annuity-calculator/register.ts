import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PensionLumpSumVsAnnuityCalculator } from './PensionLumpSumVsAnnuityCalculator';

export function registerPensionLumpSumVsAnnuityCalculator(): void {
  calculatorRegistry.register(PensionLumpSumVsAnnuityCalculator);
}

export { PensionLumpSumVsAnnuityCalculator };
