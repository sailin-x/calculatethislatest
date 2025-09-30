import { calculatorRegistry } from '../../data/calculatorRegistry';
import { dynasty_trust_growth_estimatorCalculatorCalculator } from './dynasty_trust_growth_estimatorCalculatorCalculator';

export function registerdynasty_trust_growth_estimatorCalculatorCalculator(): void {
  calculatorRegistry.register(new dynasty_trust_growth_estimatorCalculatorCalculator());
}
