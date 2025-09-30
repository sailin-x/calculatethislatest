import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ReitDividendCalculator } from './ReitDividendCalculator';

export function registerReitDividendCalculator(): void {
  calculatorRegistry.register(ReitDividendCalculator);
}

export { ReitDividendCalculator };
