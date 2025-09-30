import { calculatorRegistry } from '../../data/calculatorRegistry';
import { mergeracquisitionmadivestiturevaluationCalculator } from './mergeracquisitionmadivestiturevaluationCalculator';

export function registermergeracquisitionmadivestiturevaluationCalculator(): void {
  calculatorRegistry.register(new mergeracquisitionmadivestiturevaluationCalculator());
}
