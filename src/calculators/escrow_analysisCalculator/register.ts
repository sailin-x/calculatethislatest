import { calculatorRegistry } from '../../data/calculatorRegistry';
import { escrow_analysisCalculator } from './escrow_analysisCalculator';

export function registerescrow_analysisCalculator(): void {
  calculatorRegistry.register(new escrow_analysisCalculator());
}
