import { calculatorRegistry } from '../../data/calculatorRegistry';
import { tenant_improvementCalculator } from './tenant_improvementCalculator';

export function registertenant_improvementCalculator(): void {
  calculatorRegistry.register(new tenant_improvementCalculator());
}
