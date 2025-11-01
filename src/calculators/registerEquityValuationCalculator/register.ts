import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEquityValuationCalculator } from './registerEquityValuationCalculator';

export function registerregisterEquityValuationCalculator(): void {
  calculatorRegistry.register(new registerEquityValuationCalculator());
}
