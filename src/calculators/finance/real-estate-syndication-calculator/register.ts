import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { realEstateSyndicationCalculator } from './RealEstateSyndicationCalculator';

/**
 * Register the Real Estate Syndication Calculator
 */
export function registerRealEstateSyndicationCalculator(): void {
  calculatorRegistry.register(realEstateSyndicationCalculator);
}