import { calculatorRegistry } from '../../data/calculatorRegistry';
import { farmland_investment_roiCalculatorCalculator } from './farmland_investment_roiCalculatorCalculator';

export function registerfarmland_investment_roiCalculatorCalculator(): void {
  calculatorRegistry.register(new farmland_investment_roiCalculatorCalculator());
}
