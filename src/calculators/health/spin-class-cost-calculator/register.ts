import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SpinClassCostCalculator } from './SpinClassCostCalculator';

export function registerSpinClassCostCalculator(): void {
  calculatorRegistry.register(SpinClassCostCalculator);
}

export { SpinClassCostCalculator };
