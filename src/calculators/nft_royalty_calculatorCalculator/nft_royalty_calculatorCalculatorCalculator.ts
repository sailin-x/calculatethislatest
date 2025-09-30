import { Calculator } from '../../engines/CalculatorEngine';
import { nft_royalty_calculatorCalculatorInputs, nft_royalty_calculatorCalculatorResults, nft_royalty_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class nft_royalty_calculatorCalculatorCalculator implements Calculator<nft_royalty_calculatorCalculatorInputs, nft_royalty_calculatorCalculatorResults> {
  readonly id = 'nft_royalty_calculatorCalculator';
  readonly name = 'nft_royalty_calculatorCalculator Calculator';
  readonly description = 'Calculate nft_royalty_calculatorCalculator values';

  calculate(inputs: nft_royalty_calculatorCalculatorInputs): nft_royalty_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: nft_royalty_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: nft_royalty_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
