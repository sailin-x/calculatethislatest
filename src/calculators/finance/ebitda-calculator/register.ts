import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EbitdaCalculator } from './EbitdaCalculator';

export function registerEbitdaCalculator(): void {
  calculatorRegistry.register(EbitdaCalculator);
}

export { EbitdaCalculator };
