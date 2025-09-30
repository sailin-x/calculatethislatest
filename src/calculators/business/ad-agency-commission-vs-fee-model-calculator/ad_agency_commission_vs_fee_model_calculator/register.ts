import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad_agency_commission_vs_fee_model_calculatorCalculator } from './ad_agency_commission_vs_fee_model_calculatorCalculator';

export function registerad_agency_commission_vs_fee_model_calculatorCalculator(): void {
  calculatorRegistry.register(new ad_agency_commission_vs_fee_model_calculatorCalculator());
}
