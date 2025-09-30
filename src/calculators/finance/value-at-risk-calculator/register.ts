import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ValueAtRiskCalculator } from './ValueAtRiskCalculator';

export function registerValueAtRiskCalculator(): void {
  calculatorRegistry.register(ValueAtRiskCalculator);
}

export { ValueAtRiskCalculator };
