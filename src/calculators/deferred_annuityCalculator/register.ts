import { calculatorRegistry } from '../../data/calculatorRegistry';
import { deferred_annuityCalculatorCalculator } from './deferred_annuityCalculatorCalculator';

export function registerdeferred_annuityCalculatorCalculator(): void {
  calculatorRegistry.register(new deferred_annuityCalculatorCalculator());
}
