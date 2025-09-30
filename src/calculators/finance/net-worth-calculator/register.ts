import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetWorthCalculator } from './NetWorthCalculator';

export function registerNetWorthCalculator(): void {
  calculatorRegistry.register(NetWorthCalculator);
}

export { NetWorthCalculator };
