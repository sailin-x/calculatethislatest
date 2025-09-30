import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GuidebookCostCalculator } from './GuidebookCostCalculator';

export function registerGuidebookCostCalculator(): void {
  calculatorRegistry.register(GuidebookCostCalculator);
}

export { GuidebookCostCalculator };
