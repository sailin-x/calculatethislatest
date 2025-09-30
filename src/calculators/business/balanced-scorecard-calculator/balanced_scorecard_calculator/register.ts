import { calculatorRegistry } from '../../data/calculatorRegistry';
import { balanced_scorecard_calculatorCalculator } from './balanced_scorecard_calculatorCalculator';

export function registerbalanced_scorecard_calculatorCalculator(): void {
  calculatorRegistry.register(new balanced_scorecard_calculatorCalculator());
}
