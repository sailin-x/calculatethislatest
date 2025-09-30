import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MediaMixModelingCalculator } from './MediaMixModelingCalculator';

export function registerMediaMixModelingCalculator(): void {
  calculatorRegistry.register(MediaMixModelingCalculator);
}

export { MediaMixModelingCalculator };
