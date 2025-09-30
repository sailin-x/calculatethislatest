import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SwimmingLessonCostCalculator } from './SwimmingLessonCostCalculator';

export function registerSwimmingLessonCostCalculator(): void {
  calculatorRegistry.register(SwimmingLessonCostCalculator);
}

export { SwimmingLessonCostCalculator };
