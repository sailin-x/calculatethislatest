import { Calculator } from '../../engines/CalculatorEngine';
import { contract_review_calculatorCalculatorInputs, contract_review_calculatorCalculatorResults, contract_review_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class contract_review_calculatorCalculatorCalculator implements Calculator<contract_review_calculatorCalculatorInputs, contract_review_calculatorCalculatorResults> {
  readonly id = 'contract_review_calculatorCalculator';
  readonly name = 'contract_review_calculatorCalculator Calculator';
  readonly description = 'Calculate contract_review_calculatorCalculator values';

  calculate(inputs: contract_review_calculatorCalculatorInputs): contract_review_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: contract_review_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: contract_review_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
