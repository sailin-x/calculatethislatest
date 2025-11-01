import { calculatorRegistry } from '../../data/calculatorRegistry';
import { farmland_investment_roiCalculator } from './farmland_investment_roiCalculator';

export function registerfarmland_investment_roiCalculator(): void {
  calculatorRegistry.register(new farmland_investment_roiCalculator());
}
