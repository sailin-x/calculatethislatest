import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerDividendCalculator } from './registerDividendCalculator';

export function registerregisterDividendCalculator(): void {
  calculatorRegistry.register(new registerDividendCalculator());
}
