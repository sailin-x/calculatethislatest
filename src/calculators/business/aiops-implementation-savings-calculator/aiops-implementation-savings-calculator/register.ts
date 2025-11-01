import { calculatorRegistry } from '../../data/calculatorRegistry';
import { AiopsImplementationSavings-calculator } from './AiopsImplementationSavings-calculator';

export function RegisteraiopsImplementationSavings-calculator(): void {
  calculatorRegistry.register(new AiopsImplementationSavings-calculator());
}
