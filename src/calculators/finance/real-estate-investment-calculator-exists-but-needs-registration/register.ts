import { calculatorRegistry } from '../../data/calculatorRegistry';
import { realestateinvestmentcalculatorexistsbutneedsregistrationCalculator } from './realestateinvestmentcalculatorexistsbutneedsregistrationCalculator';

export function registerrealestateinvestmentcalculatorexistsbutneedsregistrationCalculator(): void {
  calculatorRegistry.register(new realestateinvestmentcalculatorexistsbutneedsregistrationCalculator());
}
