import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEnterpriseValueCalculator } from './registerEnterpriseValueCalculator';

export function registerregisterEnterpriseValueCalculator(): void {
  calculatorRegistry.register(new registerEnterpriseValueCalculator());
}
