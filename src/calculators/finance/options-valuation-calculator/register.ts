import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { OptionsValuationCalculator } from './OptionsValuationCalculator';

export function registerOptionsValuationCalculator(): void {
  calculatorRegistry.register(OptionsValuationCalculator);
}

export { OptionsValuationCalculator };
