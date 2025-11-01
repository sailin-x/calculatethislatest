import { calculatorRegistry } from '../../data/calculatorRegistry';
import { corporate_compliance_cost_benefit_analysisCalculator } from './corporate_compliance_cost_benefit_analysisCalculator';

export function registercorporate_compliance_cost_benefit_analysisCalculator(): void {
  calculatorRegistry.register(new corporate_compliance_cost_benefit_analysisCalculator());
}
