import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { statisticsCalculator } from './StatisticsCalculator';

export function registerStatisticsCalculator() {
  calculatorRegistry.register(StatisticsCalculator);
}
