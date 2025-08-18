import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { HOAFeeCalculator } from './HOAFeeCalculator';

export function registerHOAFeeCalculator(registry: CalculatorRegistry): void {
  registry.register(HOAFeeCalculator);
}

export { HOAFeeCalculator };
