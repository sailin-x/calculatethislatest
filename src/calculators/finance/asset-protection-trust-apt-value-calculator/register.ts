import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { aptValueCalculator } from './APTValueCalculator';

/**
 * Register the Asset Protection Trust (APT) Value Calculator
 */
export function registerAPTValueCalculator(): void {
  calculatorRegistry.register(aptValueCalculator);
}