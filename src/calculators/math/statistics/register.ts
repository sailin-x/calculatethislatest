import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { StatisticsCalculator } from './StatisticsCalculator';

export function registerStatisticsCalculator() {
  calculatorRegistry.register(StatisticsCalculator);
}
