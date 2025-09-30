import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CarAccidentPainCalculator } from './CarAccidentPainCalculator';

export function registerCarAccidentPainCalculator(): void {
  calculatorRegistry.register(CarAccidentPainCalculator);
}

export { CarAccidentPainCalculator };
