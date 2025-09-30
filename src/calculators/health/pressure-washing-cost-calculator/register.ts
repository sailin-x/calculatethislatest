import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PressureWashingCostCalculator } from './PressureWashingCostCalculator';

export function registerPressureWashingCostCalculator(): void {
  calculatorRegistry.register(PressureWashingCostCalculator);
}

export { PressureWashingCostCalculator };
