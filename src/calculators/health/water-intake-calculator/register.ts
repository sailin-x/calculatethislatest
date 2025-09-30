import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { WaterIntakeCalculator } from './WaterIntakeCalculator';

export function registerWaterIntakeCalculator(): void {
  calculatorRegistry.register(WaterIntakeCalculator);
}

export { WaterIntakeCalculator };
