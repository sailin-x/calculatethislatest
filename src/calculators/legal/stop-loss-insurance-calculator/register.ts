import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { StopLossInsuranceCalculator } from './StopLossInsuranceCalculator';

export function registerStopLossInsuranceCalculator(): void {
  calculatorRegistry.register(StopLossInsuranceCalculator);
}

export { StopLossInsuranceCalculator };
