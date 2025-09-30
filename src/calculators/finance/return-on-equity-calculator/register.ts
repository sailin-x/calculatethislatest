import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ReturnOnEquityCalculator } from './ReturnOnEquityCalculator';

export function registerReturnOnEquityCalculator(): void {
  calculatorRegistry.register(ReturnOnEquityCalculator);
}

export { ReturnOnEquityCalculator };
