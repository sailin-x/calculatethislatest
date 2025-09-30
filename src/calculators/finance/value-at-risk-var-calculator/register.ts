import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ValueAtRiskVarCalculator } from './ValueAtRiskVarCalculator';

export function registerValueAtRiskVarCalculator(): void {
  calculatorRegistry.register(ValueAtRiskVarCalculator);
}

export { ValueAtRiskVarCalculator };
