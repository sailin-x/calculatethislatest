import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad-agency-commission-calculatorCalculator } from './ad-agency-commission-calculatorCalculator';

export function registerad-agency-commission-calculatorCalculator(): void {
  calculatorRegistry.register(new ad-agency-commission-calculatorCalculator());
}
