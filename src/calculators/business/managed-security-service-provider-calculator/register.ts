import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ManagedSecurityServiceProviderCalculator } from './ManagedSecurityServiceProviderCalculator';

export function registerManagedSecurityServiceProviderCalculator(): void {
  calculatorRegistry.register(ManagedSecurityServiceProviderCalculator);
}

export { ManagedSecurityServiceProviderCalculator };
