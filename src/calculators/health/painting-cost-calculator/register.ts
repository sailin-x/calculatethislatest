import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { PaintingCostCalculator } from './PaintingCostCalculator';

export function registerPaintingCostCalculator(): void {
  calculatorRegistry.register(PaintingCostCalculator);
}

export { PaintingCostCalculator };
