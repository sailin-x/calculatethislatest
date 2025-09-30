import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { CapitalCallSchedulePlanner } from './CapitalCallSchedulePlanner';

export function registerCapitalCallSchedulePlanner(): void {
  calculatorRegistry.register(CapitalCallSchedulePlanner);
}

export { CapitalCallSchedulePlanner };
