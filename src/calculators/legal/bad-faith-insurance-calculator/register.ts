import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BadFaithInsuranceCalculator } from './BadFaithInsuranceCalculator';

export function registerBadFaithInsuranceCalculator(): void {
  calculatorRegistry.register(BadFaithInsuranceCalculator);
}

export { BadFaithInsuranceCalculator };
