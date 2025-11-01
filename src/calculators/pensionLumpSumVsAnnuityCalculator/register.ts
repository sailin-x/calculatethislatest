import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pensionLumpSumVsAnnuityCalculator } from './pensionLumpSumVsAnnuityCalculator';

export function registerpensionLumpSumVsAnnuityCalculator(): void {
  calculatorRegistry.register(new pensionLumpSumVsAnnuityCalculator());
}
