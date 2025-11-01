import { calculatorRegistry } from '../../data/calculatorRegistry';
import { real_estate_investmentCalculator } from './real_estate_investmentCalculator';

export function registerreal_estate_investmentCalculator(): void {
  calculatorRegistry.register(new real_estate_investmentCalculator());
}
