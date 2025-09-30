import { calculatorRegistry } from '../../data/calculatorRegistry';
import { fixedIndexAnnuityCalculatorCalculator } from './fixedIndexAnnuityCalculatorCalculator';

export function registerfixedIndexAnnuityCalculatorCalculator(): void {
  calculatorRegistry.register(new fixedIndexAnnuityCalculatorCalculator());
}
