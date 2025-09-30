import { calculatorRegistry } from '../../data/calculatorRegistry';
import { celebrity_endorsement_deal_valuationCalculatorCalculator } from './celebrity_endorsement_deal_valuationCalculatorCalculator';

export function registercelebrity_endorsement_deal_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new celebrity_endorsement_deal_valuationCalculatorCalculator());
}
