import { Calculator } from '../../engines/CalculatorEngine';
import { nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorInputs, nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorResults, nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorCalculator implements Calculator<nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorInputs, nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorResults> {
  readonly id = 'nft_royalty_revenue_calculator_exists_but_needs_registrationCalculator';
  readonly name = 'nft_royalty_revenue_calculator_exists_but_needs_registrationCalculator Calculator';
  readonly description = 'Calculate nft_royalty_revenue_calculator_exists_but_needs_registrationCalculator values';

  calculate(inputs: nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorInputs): nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: nft_royalty_revenue_calculator_exists_but_needs_registrationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
