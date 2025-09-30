import { calculatorRegistry } from '../../data/calculatorRegistry';
import { escrow_analysisCalculatorCalculator } from './escrow_analysisCalculatorCalculator';

export function registerescrow_analysisCalculatorCalculator(): void {
  calculatorRegistry.register(new escrow_analysisCalculatorCalculator());
}
