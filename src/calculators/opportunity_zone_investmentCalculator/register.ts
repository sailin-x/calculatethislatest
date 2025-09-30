import { calculatorRegistry } from '../../data/calculatorRegistry';
import { opportunity_zone_investmentCalculatorCalculator } from './opportunity_zone_investmentCalculatorCalculator';

export function registeropportunity_zone_investmentCalculatorCalculator(): void {
  calculatorRegistry.register(new opportunity_zone_investmentCalculatorCalculator());
}
