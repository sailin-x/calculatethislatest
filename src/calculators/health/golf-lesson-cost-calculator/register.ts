import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GolfLessonCostCalculator } from './GolfLessonCostCalculator';

export function registerGolfLessonCostCalculator(): void {
  calculatorRegistry.register(GolfLessonCostCalculator);
}

export { GolfLessonCostCalculator };
