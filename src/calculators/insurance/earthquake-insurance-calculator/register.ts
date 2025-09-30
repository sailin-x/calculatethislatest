import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { EarthquakeInsuranceCalculator } from './EarthquakeInsuranceCalculator';

export function registerEarthquakeInsuranceCalculator(): void {
  calculatorRegistry.register(EarthquakeInsuranceCalculator);
}

export { EarthquakeInsuranceCalculator };
