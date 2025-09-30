import { Calculator } from '../../engines/CalculatorEngine';
import { nft_minting_cost_calculatorCalculatorInputs, nft_minting_cost_calculatorCalculatorResults, nft_minting_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class nft_minting_cost_calculatorCalculatorCalculator implements Calculator<nft_minting_cost_calculatorCalculatorInputs, nft_minting_cost_calculatorCalculatorResults> {
  readonly id = 'nft_minting_cost_calculatorCalculator';
  readonly name = 'nft_minting_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate nft_minting_cost_calculatorCalculator values';

  calculate(inputs: nft_minting_cost_calculatorCalculatorInputs): nft_minting_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: nft_minting_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: nft_minting_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
