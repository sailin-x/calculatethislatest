import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { GasFeeOptimizerCalculator } from './GasFeeOptimizerCalculator';

export function registerGasFeeOptimizerCalculator(): void {
  calculatorRegistry.register(GasFeeOptimizerCalculator);
}

export { GasFeeOptimizerCalculator };
