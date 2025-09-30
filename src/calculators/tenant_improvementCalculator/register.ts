import { calculatorRegistry } from '../../data/calculatorRegistry';
import { tenant_improvementCalculatorCalculator } from './tenant_improvementCalculatorCalculator';

export function registertenant_improvementCalculatorCalculator(): void {
  calculatorRegistry.register(new tenant_improvementCalculatorCalculator());
}
