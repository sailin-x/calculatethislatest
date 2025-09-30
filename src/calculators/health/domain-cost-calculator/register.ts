import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DomainCostCalculator } from './DomainCostCalculator';

export function registerDomainCostCalculator(): void {
  calculatorRegistry.register(DomainCostCalculator);
}

export { DomainCostCalculator };
