import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SkiLessonCostCalculator } from './SkiLessonCostCalculator';

export function registerSkiLessonCostCalculator(): void {
  calculatorRegistry.register(SkiLessonCostCalculator);
}

export { SkiLessonCostCalculator };
