import { calculatorRegistry } from '../../data/calculatorRegistry';
import { musicroyaltyinvestmentcalculatorCalculator } from './musicroyaltyinvestmentcalculatorCalculator';

export function registermusicroyaltyinvestmentcalculatorCalculator(): void {
  calculatorRegistry.register(new musicroyaltyinvestmentcalculatorCalculator());
}
