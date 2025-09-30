import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CustomerLifetimeValueCalculator } from './CustomerLifetimeValueCalculator';

export function registerCustomerLifetimeValueCalculator(): void {
  calculatorRegistry.register(CustomerLifetimeValueCalculator);
}

export { CustomerLifetimeValueCalculator };
