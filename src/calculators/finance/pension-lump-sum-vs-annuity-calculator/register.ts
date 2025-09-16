import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { pensionLumpSumVsAnnuityCalculator } from './PensionLumpSumVsAnnuityCalculator';

/**
 * Register the Pension Lump Sum vs. Annuity Calculator
 */
export function registerPensionLumpSumVsAnnuityCalculator(): void {
  calculatorRegistry.register(pensionLumpSumVsAnnuityCalculator);
}