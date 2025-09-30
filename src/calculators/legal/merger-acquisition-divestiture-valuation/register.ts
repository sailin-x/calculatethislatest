import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MergerAcquisitionDivestitureValuation } from './MergerAcquisitionDivestitureValuation';

export function registerMergerAcquisitionDivestitureValuation(): void {
  calculatorRegistry.register(MergerAcquisitionDivestitureValuation);
}

export { MergerAcquisitionDivestitureValuation };
