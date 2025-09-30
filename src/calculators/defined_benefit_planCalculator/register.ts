import { calculatorRegistry } from '../../data/calculatorRegistry';
import { defined_benefit_planCalculatorCalculator } from './defined_benefit_planCalculatorCalculator';

export function registerdefined_benefit_planCalculatorCalculator(): void {
  calculatorRegistry.register(new defined_benefit_planCalculatorCalculator());
}
