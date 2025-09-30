import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PriceFixingOverchargeEstimator } from './PriceFixingOverchargeEstimator';

export function registerPriceFixingOverchargeEstimator(): void {
  calculatorRegistry.register(PriceFixingOverchargeEstimator);
}

export { PriceFixingOverchargeEstimator };
