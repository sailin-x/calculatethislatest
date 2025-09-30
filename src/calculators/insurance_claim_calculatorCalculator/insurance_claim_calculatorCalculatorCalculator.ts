import { Calculator } from '../../engines/CalculatorEngine';
import { insurance_claim_calculatorCalculatorInputs, insurance_claim_calculatorCalculatorResults, insurance_claim_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class insurance_claim_calculatorCalculatorCalculator implements Calculator<insurance_claim_calculatorCalculatorInputs, insurance_claim_calculatorCalculatorResults> {
  readonly id = 'insurance_claim_calculatorCalculator';
  readonly name = 'insurance_claim_calculatorCalculator Calculator';
  readonly description = 'Calculate insurance_claim_calculatorCalculator values';

  calculate(inputs: insurance_claim_calculatorCalculatorInputs): insurance_claim_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: insurance_claim_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: insurance_claim_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
