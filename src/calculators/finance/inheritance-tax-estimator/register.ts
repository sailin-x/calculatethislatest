import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InheritanceTaxEstimator } from './InheritanceTaxEstimator';

export function registerInheritanceTaxEstimator(): void {
  calculatorRegistry.register(InheritanceTaxEstimator);
}

export { InheritanceTaxEstimator };
