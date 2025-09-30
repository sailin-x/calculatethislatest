import { calculatorRegistry } from '../../data/calculatorRegistry';
import { defined_contribution_planCalculatorCalculator } from './defined_contribution_planCalculatorCalculator';

export function registerdefined_contribution_planCalculatorCalculator(): void {
  calculatorRegistry.register(new defined_contribution_planCalculatorCalculator());
}
