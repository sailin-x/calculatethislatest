import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { inheritanceTaxEstimator } from './InheritanceTaxEstimator';

/**
 * Register the Inheritance Tax Estimator
 */
export function registerInheritanceTaxEstimator(): void {
  calculatorRegistry.register(inheritanceTaxEstimator);
}