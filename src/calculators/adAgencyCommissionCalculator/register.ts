import { calculatorRegistry } from '../../data/calculatorRegistry';
import { ad_agency_commission_calculator } from './ad_agency_commission_calculator';

export function registerad_agency_commission_calculator(): void {
  calculatorRegistry.register(ad_agency_commission_calculator);
}
