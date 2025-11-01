import { calculatorRegistry } from '../../data/calculatorRegistry';
import { DividendCalculator } from './DividendCalculator';

export function registerDividendCalculator(): void {
  calculatorRegistry.register(new DividendCalculator());
}
