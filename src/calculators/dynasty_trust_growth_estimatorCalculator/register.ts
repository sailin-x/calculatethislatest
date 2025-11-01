import { calculatorRegistry } from '../../data/calculatorRegistry';
import { dynasty_trust_growth_estimatorCalculator } from './dynasty_trust_growth_estimatorCalculator';

export function registerdynasty_trust_growth_estimatorCalculator(): void {
  calculatorRegistry.register(new dynasty_trust_growth_estimatorCalculator());
}
