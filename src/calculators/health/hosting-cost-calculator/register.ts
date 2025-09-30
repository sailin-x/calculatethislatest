import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HostingCostCalculator } from './HostingCostCalculator';

export function registerHostingCostCalculator(): void {
  calculatorRegistry.register(HostingCostCalculator);
}

export { HostingCostCalculator };
