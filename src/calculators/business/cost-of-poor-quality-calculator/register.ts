import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CostOfPoorQualityCalculator } from './CostOfPoorQualityCalculator';

export function registerCostOfPoorQualityCalculator(): void {
  calculatorRegistry.register(CostOfPoorQualityCalculator);
}

export { CostOfPoorQualityCalculator };
