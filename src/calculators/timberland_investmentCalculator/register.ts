import { calculatorRegistry } from '../../data/calculatorRegistry';
import { timberland_investmentCalculatorCalculator } from './timberland_investmentCalculatorCalculator';

export function registertimberland_investmentCalculatorCalculator(): void {
  calculatorRegistry.register(new timberland_investmentCalculatorCalculator());
}
