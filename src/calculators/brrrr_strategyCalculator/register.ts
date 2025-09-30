import { calculatorRegistry } from '../../data/calculatorRegistry';
import { brrrr_strategyCalculatorCalculator } from './brrrr_strategyCalculatorCalculator';

export function registerbrrrr_strategyCalculatorCalculator(): void {
  calculatorRegistry.register(new brrrr_strategyCalculatorCalculator());
}
