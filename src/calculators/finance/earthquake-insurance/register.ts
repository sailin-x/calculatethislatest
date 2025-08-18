import { CalculatorRegistry } from '../../../data/calculatorRegistry';
import { EarthquakeInsuranceCalculator } from './EarthquakeInsuranceCalculator';

export function registerEarthquakeInsuranceCalculator(registry: CalculatorRegistry): void {
  registry.register(EarthquakeInsuranceCalculator);
}

export { EarthquakeInsuranceCalculator };
