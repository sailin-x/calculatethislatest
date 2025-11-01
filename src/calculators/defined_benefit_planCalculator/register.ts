import { calculatorRegistry } from '../../data/calculatorRegistry';
import { defined_benefit_planCalculator } from './defined_benefit_planCalculator';

export function registerdefined_benefit_planCalculator(): void {
  calculatorRegistry.register(new defined_benefit_planCalculator());
}
