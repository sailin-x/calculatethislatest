import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ChurnRateCalculator } from './ChurnRateCalculator';

export function registerChurnRateCalculator(): void {
  calculatorRegistry.register(ChurnRateCalculator);
}

export { ChurnRateCalculator };
