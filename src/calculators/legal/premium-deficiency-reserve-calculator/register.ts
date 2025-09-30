import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PremiumDeficiencyReserveCalculator } from './PremiumDeficiencyReserveCalculator';

export function registerPremiumDeficiencyReserveCalculator(): void {
  calculatorRegistry.register(PremiumDeficiencyReserveCalculator);
}

export { PremiumDeficiencyReserveCalculator };
