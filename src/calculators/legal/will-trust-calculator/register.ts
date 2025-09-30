import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WillTrustCalculator } from './WillTrustCalculator';

export function registerWillTrustCalculator(): void {
  calculatorRegistry.register(WillTrustCalculator);
}

export { WillTrustCalculator };
