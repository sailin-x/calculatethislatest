import { calculatorRegistry } from '../../data/calculatorRegistry';
import { it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorCalculator } from './it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorCalculator';

export function registerit_outsourcing_vs_in_house_cost_benefit_analysisCalculatorCalculator(): void {
  calculatorRegistry.register(new it_outsourcing_vs_in_house_cost_benefit_analysisCalculatorCalculator());
}
