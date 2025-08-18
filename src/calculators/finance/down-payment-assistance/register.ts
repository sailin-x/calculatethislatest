import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { DownPaymentAssistanceCalculator } from './DownPaymentAssistanceCalculator';

export function registerDownPaymentAssistanceCalculator(registry: CalculatorRegistry): void {
  registry.register(DownPaymentAssistanceCalculator);
}

export { DownPaymentAssistanceCalculator };
