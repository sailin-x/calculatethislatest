import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { titleInsuranceCalculator } from './TitleInsuranceCalculator';

/**
 * Register the Title Insurance Calculator
 */
export function registerTitleInsuranceCalculator(): void {
  calculatorRegistry.register(titleInsuranceCalculator);
}