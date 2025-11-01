import { calculatorRegistry } from '../../data/calculatorRegistry';
import { statisticsCalculator } from './statisticsCalculator';

export function registerstatisticsCalculator(): void {
  calculatorRegistry.register(new statisticsCalculator());
}
