import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SnowboardLessonCostCalculator } from './SnowboardLessonCostCalculator';

export function registerSnowboardLessonCostCalculator(): void {
  calculatorRegistry.register(SnowboardLessonCostCalculator);
}

export { SnowboardLessonCostCalculator };
