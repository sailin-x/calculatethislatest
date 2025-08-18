import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { EscrowAnalysisCalculator } from './EscrowAnalysisCalculator';

export function registerEscrowAnalysisCalculator(registry: CalculatorRegistry): void {
  registry.register(EscrowAnalysisCalculator);
}

export { EscrowAnalysisCalculator };
