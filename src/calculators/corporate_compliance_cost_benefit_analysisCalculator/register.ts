import { calculatorRegistry } from '../../data/calculatorRegistry';
import { corporate_compliance_cost_benefit_analysisCalculatorCalculator } from './corporate_compliance_cost_benefit_analysisCalculatorCalculator';

export function registercorporate_compliance_cost_benefit_analysisCalculatorCalculator(): void {
  calculatorRegistry.register(new corporate_compliance_cost_benefit_analysisCalculatorCalculator());
}
