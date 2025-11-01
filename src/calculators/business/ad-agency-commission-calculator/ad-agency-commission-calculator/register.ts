import { calculatorRegistry } from '../../data/calculatorRegistry';
import { AdAgencyCommission-calculator } from './AdAgencyCommission-calculator';

export function RegisteradAgencyCommission-calculator(): void {
  calculatorRegistry.register(new AdAgencyCommission-calculator());
}
