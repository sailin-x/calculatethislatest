import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { MacroCalculator } from './MacroCalculator';

export function registerMacroCalculator(): void {
  calculatorRegistry.register(MacroCalculator);
}

export { MacroCalculator };
