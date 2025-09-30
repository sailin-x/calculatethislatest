import { calculatorRegistry } from '../../data/calculatorRegistry';
import { EnterpriseValueCalculatorCalculator } from './EnterpriseValueCalculatorCalculator';

export function registerEnterpriseValueCalculatorCalculator(): void {
  calculatorRegistry.register(new EnterpriseValueCalculatorCalculator());
}
