import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HedgeFundFeeCalculator } from './HedgeFundFeeCalculator';

export function registerHedgeFundFeeCalculator(): void {
  calculatorRegistry.register(HedgeFundFeeCalculator);
}

export { HedgeFundFeeCalculator };
