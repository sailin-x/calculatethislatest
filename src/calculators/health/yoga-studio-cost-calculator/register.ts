import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { YogaStudioCostCalculator } from './YogaStudioCostCalculator';

export function registerYogaStudioCostCalculator(): void {
  calculatorRegistry.register(YogaStudioCostCalculator);
}

export { YogaStudioCostCalculator };
