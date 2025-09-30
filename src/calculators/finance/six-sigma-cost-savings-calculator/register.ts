import { calculatorRegistry } from '../../data/calculatorRegistry';
import { sixsigmacostsavingscalculatorCalculator } from './sixsigmacostsavingscalculatorCalculator';

export function registersixsigmacostsavingscalculatorCalculator(): void {
  calculatorRegistry.register(new sixsigmacostsavingscalculatorCalculator());
}
