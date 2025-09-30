import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AntitrustCalculator } from './AntitrustCalculator';

export function registerAntitrustCalculator(): void {
  calculatorRegistry.register(AntitrustCalculator);
}

export { AntitrustCalculator };
