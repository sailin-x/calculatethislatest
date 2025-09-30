import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerPensionLumpSumVsAnnuityCalculatorCalculator } from './registerPensionLumpSumVsAnnuityCalculatorCalculator';

export function registerregisterPensionLumpSumVsAnnuityCalculatorCalculator(): void {
  calculatorRegistry.register(new registerPensionLumpSumVsAnnuityCalculatorCalculator());
}
