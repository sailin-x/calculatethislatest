import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { StatisticsCalculator } from './StatisticsCalculator';

export function registerStatisticsCalculator(): void {
  calculatorRegistry.register(StatisticsCalculator);
}

export { StatisticsCalculator };
