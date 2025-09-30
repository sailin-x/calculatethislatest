import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { OptionsTradingCalculator } from './OptionsTradingCalculator';

export function registerOptionsTradingCalculator(): void {
  calculatorRegistry.register(OptionsTradingCalculator);
}

export { OptionsTradingCalculator };
