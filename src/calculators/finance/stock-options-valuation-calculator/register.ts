import { calculatorRegistry } from '../../data/calculatorRegistry';
import { stockoptionsvaluationcalculatorCalculator } from './stockoptionsvaluationcalculatorCalculator';

export function registerstockoptionsvaluationcalculatorCalculator(): void {
  calculatorRegistry.register(new stockoptionsvaluationcalculatorCalculator());
}
