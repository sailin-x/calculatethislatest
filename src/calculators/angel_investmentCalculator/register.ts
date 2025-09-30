import { calculatorRegistry } from '../../data/calculatorRegistry';
import { angel_investmentCalculatorCalculator } from './angel_investmentCalculatorCalculator';

export function registerangel_investmentCalculatorCalculator(): void {
  calculatorRegistry.register(new angel_investmentCalculatorCalculator());
}
