import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { BreakEvenAnalysisCalculator } from './BreakEvenAnalysisCalculator';

export function registerBreakEvenAnalysisCalculator() {
  calculatorRegistry.register(BreakEvenAnalysisCalculator);
}
