import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MergerAcquisitionDivestitureCalculator } from './MergerAcquisitionDivestitureCalculator';

export function registerMergerAcquisitionDivestitureCalculator(): void {
  calculatorRegistry.register(MergerAcquisitionDivestitureCalculator);
}

export { MergerAcquisitionDivestitureCalculator };
