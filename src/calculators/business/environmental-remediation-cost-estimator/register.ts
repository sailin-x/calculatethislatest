import { calculatorRegistry } from '../../data/calculatorRegistry';
import { environmentalremediationcostestimatorCalculator } from './environmentalremediationcostestimatorCalculator';

export function registerenvironmentalremediationcostestimatorCalculator(): void {
  calculatorRegistry.register(new environmentalremediationcostestimatorCalculator());
}
