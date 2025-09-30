import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PriceFixingOverchargeCalculator } from './PriceFixingOverchargeCalculator';

export function registerPriceFixingOverchargeCalculator(): void {
  calculatorRegistry.register(PriceFixingOverchargeCalculator);
}

export { PriceFixingOverchargeCalculator };
