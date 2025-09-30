import { calculatorRegistry } from '../../data/calculatorRegistry';
import { retirementCalculatorCalculator } from './retirementCalculatorCalculator';

export function registerretirementCalculatorCalculator(): void {
  calculatorRegistry.register(new retirementCalculatorCalculator());
}
