import { calculatorRegistry } from '../../data/calculatorRegistry';
import { suretybondpremiumcalculatorCalculator } from './suretybondpremiumcalculatorCalculator';

export function registersuretybondpremiumcalculatorCalculator(): void {
  calculatorRegistry.register(new suretybondpremiumcalculatorCalculator());
}
