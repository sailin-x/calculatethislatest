import { calculatorRegistry } from '../../data/calculatorRegistry';
import { incurredbutnotreportedibnrreserveestimatorCalculator } from './incurredbutnotreportedibnrreserveestimatorCalculator';

export function registerincurredbutnotreportedibnrreserveestimatorCalculator(): void {
  calculatorRegistry.register(new incurredbutnotreportedibnrreserveestimatorCalculator());
}
