import { calculatorRegistry } from '../../data/calculatorRegistry';
import { AdReachFrequency-calculator } from './AdReachFrequency-calculator';

export function registerAdReachFrequency-calculator(): void {
  calculatorRegistry.register(new AdReachFrequency-calculator());
}
