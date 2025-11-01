import { calculatorRegistry } from '../../data/calculatorRegistry';
import { svod_streaming_content_licensing_valuationCalculator } from './svod_streaming_content_licensing_valuationCalculator';

export function registersvod_streaming_content_licensing_valuationCalculator(): void {
  calculatorRegistry.register(new svod_streaming_content_licensing_valuationCalculator());
}
