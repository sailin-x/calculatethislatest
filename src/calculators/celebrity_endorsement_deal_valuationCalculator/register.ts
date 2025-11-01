import { calculatorRegistry } from '../../data/calculatorRegistry';
import { celebrity_endorsement_deal_valuationCalculator } from './celebrity_endorsement_deal_valuationCalculator';

export function registercelebrity_endorsement_deal_valuationCalculator(): void {
  calculatorRegistry.register(new celebrity_endorsement_deal_valuationCalculator());
}
