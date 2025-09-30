import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { UgmaUtmaCustodialAccountCalculator } from './UgmaUtmaCustodialAccountCalculator';

export function registerUgmaUtmaCustodialAccountCalculator(): void {
  calculatorRegistry.register(UgmaUtmaCustodialAccountCalculator);
}

export { UgmaUtmaCustodialAccountCalculator };
