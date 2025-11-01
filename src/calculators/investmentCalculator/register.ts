import { calculatorRegistry } from '../../data/calculatorRegistry';
import { investmentCalculator } from './investmentCalculator';

export function registerinvestmentCalculator(): void {
  calculatorRegistry.register(new investmentCalculator());
}
