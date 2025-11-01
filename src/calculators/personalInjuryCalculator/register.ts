import { calculatorRegistry } from '../../data/calculatorRegistry';
import { personalInjuryCalculator } from './personalInjuryCalculator';

export function registerpersonalInjuryCalculator(): void {
  calculatorRegistry.register(new personalInjuryCalculator());
}
