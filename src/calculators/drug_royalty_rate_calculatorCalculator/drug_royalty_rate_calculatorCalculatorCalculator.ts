import { Calculator } from '../../engines/CalculatorEngine';
import { drug_royalty_rate_calculatorCalculatorInputs, drug_royalty_rate_calculatorCalculatorResults, drug_royalty_rate_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class drug_royalty_rate_calculatorCalculatorCalculator implements Calculator<drug_royalty_rate_calculatorCalculatorInputs, drug_royalty_rate_calculatorCalculatorResults> {
  readonly id = 'drug_royalty_rate_calculatorCalculator';
  readonly name = 'drug_royalty_rate_calculatorCalculator Calculator';
  readonly description = 'Calculate drug_royalty_rate_calculatorCalculator values';

  calculate(inputs: drug_royalty_rate_calculatorCalculatorInputs): drug_royalty_rate_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: drug_royalty_rate_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: drug_royalty_rate_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
