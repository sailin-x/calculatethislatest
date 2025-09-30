import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { TerminalValueCalculator } from './TerminalValueCalculator';

export function registerTerminalValueCalculator(): void {
  calculatorRegistry.register(TerminalValueCalculator);
}

export { TerminalValueCalculator };
