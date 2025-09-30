import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CorporateComplianceCostBenefitCalculator } from './CorporateComplianceCostBenefitCalculator';

export function registerCorporateComplianceCostBenefitCalculator(): void {
  calculatorRegistry.register(CorporateComplianceCostBenefitCalculator);
}

export { CorporateComplianceCostBenefitCalculator };
