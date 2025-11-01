import { calculatorRegistry } from '../../data/calculatorRegistry';
import { timberland_investmentCalculator } from './timberland_investmentCalculator';

export function registertimberland_investmentCalculator(): void {
  calculatorRegistry.register(new timberland_investmentCalculator());
}
