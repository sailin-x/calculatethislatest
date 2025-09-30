import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TrustFundDistributionCalculator } from './TrustFundDistributionCalculator';

export function registerTrustFundDistributionCalculator(): void {
  calculatorRegistry.register(TrustFundDistributionCalculator);
}

export { TrustFundDistributionCalculator };
