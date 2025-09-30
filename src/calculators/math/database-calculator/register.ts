import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { DatabaseCalculator } from './DatabaseCalculator';

export function registerDatabaseCalculator(): void {
  calculatorRegistry.register(DatabaseCalculator);
}

export { DatabaseCalculator };
