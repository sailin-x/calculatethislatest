import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AdAgencyCommissionCalculator } from './AdAgencyCommissionCalculator';

export function registerAdAgencyCommissionCalculator(): void {
  calculatorRegistry.register(AdAgencyCommissionCalculator);
}

export { AdAgencyCommissionCalculator };
