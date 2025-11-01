import { calculatorRegistry } from '../../data/calculatorRegistry';
import { EnterpriseValueCalculator } from './EnterpriseValueCalculator';

export function registerEnterpriseValueCalculator(): void {
  calculatorRegistry.register(new EnterpriseValueCalculator());
}
