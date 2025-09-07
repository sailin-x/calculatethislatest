import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { OpportunityZoneInvestmentCalculator } from './OpportunityZoneInvestmentCalculator';

export function registerOpportunityZoneInvestmentCalculator(): void {
  calculatorRegistry.register(OpportunityZoneInvestmentCalculator);
}