import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DividendCalculator } from './DividendCalculator';

export function registerDividendCalculator(): void {
  calculatorRegistry.register(DividendCalculator);
}

export { DividendCalculator };
