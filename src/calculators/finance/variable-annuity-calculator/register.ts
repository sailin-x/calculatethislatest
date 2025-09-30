import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { VariableAnnuityCalculator } from './VariableAnnuityCalculator';

export function registerVariableAnnuityCalculator(): void {
  calculatorRegistry.register(VariableAnnuityCalculator);
}

export { VariableAnnuityCalculator };
