import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TennisLessonCostCalculator } from './TennisLessonCostCalculator';

export function registerTennisLessonCostCalculator(): void {
  calculatorRegistry.register(TennisLessonCostCalculator);
}

export { TennisLessonCostCalculator };
