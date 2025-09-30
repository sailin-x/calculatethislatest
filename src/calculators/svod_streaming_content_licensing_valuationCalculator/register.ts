import { calculatorRegistry } from '../../data/calculatorRegistry';
import { svod_streaming_content_licensing_valuationCalculatorCalculator } from './svod_streaming_content_licensing_valuationCalculatorCalculator';

export function registersvod_streaming_content_licensing_valuationCalculatorCalculator(): void {
  calculatorRegistry.register(new svod_streaming_content_licensing_valuationCalculatorCalculator());
}
