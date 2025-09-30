import { calculatorRegistry } from '../../data/calculatorRegistry';
import { pensionLumpSumVsAnnuityCalculatorCalculator } from './pensionLumpSumVsAnnuityCalculatorCalculator';

export function registerpensionLumpSumVsAnnuityCalculatorCalculator(): void {
  calculatorRegistry.register(new pensionLumpSumVsAnnuityCalculatorCalculator());
}
