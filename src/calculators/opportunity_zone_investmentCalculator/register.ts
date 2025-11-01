import { calculatorRegistry } from '../../data/calculatorRegistry';
import { opportunity_zone_investmentCalculator } from './opportunity_zone_investmentCalculator';

export function registeropportunity_zone_investmentCalculator(): void {
  calculatorRegistry.register(new opportunity_zone_investmentCalculator());
}
