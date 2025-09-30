import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InternalRateOfReturnCalculator } from './InternalRateOfReturnCalculator';

export function registerInternalRateOfReturnCalculator(): void {
  calculatorRegistry.register(InternalRateOfReturnCalculator);
}

export { InternalRateOfReturnCalculator };
