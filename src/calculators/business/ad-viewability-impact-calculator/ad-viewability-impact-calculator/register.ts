import { calculatorRegistry } from '../../data/calculatorRegistry';
import { AdViewabilityImpact-calculator } from './AdViewabilityImpact-calculator';

export function registerAdViewabilityImpact-calculator(): void {
  calculatorRegistry.register(new AdViewabilityImpact-calculator());
}
