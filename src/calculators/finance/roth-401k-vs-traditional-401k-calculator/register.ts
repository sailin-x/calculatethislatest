import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { roth401kVsTraditional401kCalculator } from './Roth401kVsTraditional401kCalculator';

/**
 * Register the Roth 401(k) vs. Traditional 401(k) Calculator
 */
export function registerRoth401kVsTraditional401kCalculator(): void {
  calculatorRegistry.register(roth401kVsTraditional401kCalculator);
}