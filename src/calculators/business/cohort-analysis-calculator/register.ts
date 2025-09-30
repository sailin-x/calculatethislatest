import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CohortAnalysisCalculator } from './CohortAnalysisCalculator';

export function registerCohortAnalysisCalculator(): void {
  calculatorRegistry.register(CohortAnalysisCalculator);
}

export { CohortAnalysisCalculator };
