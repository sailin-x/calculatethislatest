import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EquityValuationCalculator } from './EquityValuationCalculator';

export function registerEquityValuationCalculator(): void {
  calculatorRegistry.register(EquityValuationCalculator);
}

export { EquityValuationCalculator };
