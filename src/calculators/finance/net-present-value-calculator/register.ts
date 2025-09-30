import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetPresentValueCalculator } from './NetPresentValueCalculator';

export function registerNetPresentValueCalculator(): void {
  calculatorRegistry.register(NetPresentValueCalculator);
}

export { NetPresentValueCalculator };
