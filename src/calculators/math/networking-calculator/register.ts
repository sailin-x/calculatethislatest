import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { NetworkingCalculator } from './NetworkingCalculator';

export function registerNetworkingCalculator(): void {
  calculatorRegistry.register(NetworkingCalculator);
}

export { NetworkingCalculator };
