import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad_agency_commission_calculatorCalculator } from './ad_agency_commission_calculatorCalculator';

export function registerad_agency_commission_calculatorCalculator(): void {
  calculatorRegistry.register(new ad_agency_commission_calculatorCalculator());
}
