import { calculatorRegistry } from '../../data/calculatorRegistry';
import { angel_investmentCalculator } from './angel_investmentCalculator';

export function registerangel_investmentCalculator(): void {
  calculatorRegistry.register(new angel_investmentCalculator());
}
