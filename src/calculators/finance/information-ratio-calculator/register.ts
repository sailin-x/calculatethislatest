import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { InformationRatioCalculator } from './InformationRatioCalculator';

export function registerInformationRatioCalculator(): void {
  calculatorRegistry.register(InformationRatioCalculator);
}

export { InformationRatioCalculator };
