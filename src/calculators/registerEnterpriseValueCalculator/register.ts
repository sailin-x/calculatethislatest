import { calculatorRegistry } from '../../data/calculatorRegistry';
import { registerEnterpriseValueCalculatorCalculator } from './registerEnterpriseValueCalculatorCalculator';

export function registerregisterEnterpriseValueCalculatorCalculator(): void {
  calculatorRegistry.register(new registerEnterpriseValueCalculatorCalculator());
}
