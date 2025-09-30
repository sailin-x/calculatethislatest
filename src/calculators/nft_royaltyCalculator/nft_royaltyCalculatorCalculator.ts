import { Calculator } from '../../engines/CalculatorEngine';
import { nft_royaltyCalculatorInputs, nft_royaltyCalculatorResults, nft_royaltyCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class nft_royaltyCalculatorCalculator implements Calculator<nft_royaltyCalculatorInputs, nft_royaltyCalculatorResults> {
  readonly id = 'nft_royaltyCalculator';
  readonly name = 'nft_royaltyCalculator Calculator';
  readonly description = 'Calculate nft_royaltyCalculator values';

  calculate(inputs: nft_royaltyCalculatorInputs): nft_royaltyCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: nft_royaltyCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: nft_royaltyCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
