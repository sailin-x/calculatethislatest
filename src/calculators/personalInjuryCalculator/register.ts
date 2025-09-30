import { calculatorRegistry } from '../../data/calculatorRegistry';
import { personalInjuryCalculatorCalculator } from './personalInjuryCalculatorCalculator';

export function registerpersonalInjuryCalculatorCalculator(): void {
  calculatorRegistry.register(new personalInjuryCalculatorCalculator());
}
