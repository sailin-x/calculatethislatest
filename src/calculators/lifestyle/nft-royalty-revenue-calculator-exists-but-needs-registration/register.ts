import { calculatorRegistry } from '../../data/calculatorRegistry';
import { nftroyaltyrevenuecalculatorexistsbutneedsregistrationCalculator } from './nftroyaltyrevenuecalculatorexistsbutneedsregistrationCalculator';

export function registernftroyaltyrevenuecalculatorexistsbutneedsregistrationCalculator(): void {
  calculatorRegistry.register(new nftroyaltyrevenuecalculatorexistsbutneedsregistrationCalculator());
}
