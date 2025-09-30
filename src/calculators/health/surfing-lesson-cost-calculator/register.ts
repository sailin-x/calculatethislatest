import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { SurfingLessonCostCalculator } from './SurfingLessonCostCalculator';

export function registerSurfingLessonCostCalculator(): void {
  calculatorRegistry.register(SurfingLessonCostCalculator);
}

export { SurfingLessonCostCalculator };
