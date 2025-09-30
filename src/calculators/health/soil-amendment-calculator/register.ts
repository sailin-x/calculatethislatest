import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SoilAmendmentCalculator } from './SoilAmendmentCalculator';

export function registerSoilAmendmentCalculator(): void {
  calculatorRegistry.register(SoilAmendmentCalculator);
}

export { SoilAmendmentCalculator };
