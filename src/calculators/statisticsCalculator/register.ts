import { calculatorRegistry } from '../../data/calculatorRegistry';
import { statisticsCalculatorCalculator } from './statisticsCalculatorCalculator';

export function registerstatisticsCalculatorCalculator(): void {
  calculatorRegistry.register(new statisticsCalculatorCalculator());
}
