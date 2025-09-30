import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { AdvertisingCostCalculator } from './AdvertisingCostCalculator';

export function registerAdvertisingCostCalculator(): void {
  calculatorRegistry.register(AdvertisingCostCalculator);
}

export { AdvertisingCostCalculator };
