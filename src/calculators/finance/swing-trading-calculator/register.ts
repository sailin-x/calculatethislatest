import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SwingTradingCalculator } from './SwingTradingCalculator';

export function registerSwingTradingCalculator(): void {
  calculatorRegistry.register(SwingTradingCalculator);
}

export { SwingTradingCalculator };
