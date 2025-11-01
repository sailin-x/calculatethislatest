import { calculatorRegistry } from '../../data/calculatorRegistry';
import { nft_royalty_revenue_calculator_exists_but_needs_registrationCalculator } from './nft_royalty_revenue_calculator_exists_but_needs_registrationCalculator';

export function registernft_royalty_revenue_calculator_exists_but_needs_registrationCalculator(): void {
  calculatorRegistry.register(new nft_royalty_revenue_calculator_exists_but_needs_registrationCalculator());
}
