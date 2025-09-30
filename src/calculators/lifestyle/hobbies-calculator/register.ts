import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { HobbiesCalculator } from './HobbiesCalculator';

export function registerHobbiesCalculator(): void {
  calculatorRegistry.register(HobbiesCalculator);
}

export { HobbiesCalculator };
