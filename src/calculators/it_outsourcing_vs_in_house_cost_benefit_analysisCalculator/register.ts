import { calculatorRegistry } from '../../data/calculatorRegistry';
import { it_outsourcing_vs_in_house_cost_benefit_analysisCalculator } from './it_outsourcing_vs_in_house_cost_benefit_analysisCalculator';

export function registerit_outsourcing_vs_in_house_cost_benefit_analysisCalculator(): void {
  calculatorRegistry.register(new it_outsourcing_vs_in_house_cost_benefit_analysisCalculator());
}
