import { calculatorRegistry } from '../../data/calculatorRegistry';
import { defined_contribution_planCalculator } from './defined_contribution_planCalculator';

export function registerdefined_contribution_planCalculator(): void {
  calculatorRegistry.register(new defined_contribution_planCalculator());
}
