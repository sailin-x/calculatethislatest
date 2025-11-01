import { calculatorRegistry } from '../../data/calculatorRegistry';
import { angel_investment_dilutionCalculator } from './angel_investment_dilutionCalculator';

export function registerangel_investment_dilutionCalculator(): void {
  calculatorRegistry.register(new angel_investment_dilutionCalculator());
}
