import { Calculator } from '../../engines/CalculatorEngine';
import { bad_faith_insurance_claim_calculatorCalculatorInputs, bad_faith_insurance_claim_calculatorCalculatorResults, bad_faith_insurance_claim_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bad_faith_insurance_claim_calculatorCalculatorCalculator implements Calculator<bad_faith_insurance_claim_calculatorCalculatorInputs, bad_faith_insurance_claim_calculatorCalculatorResults> {
  readonly id = 'bad_faith_insurance_claim_calculatorCalculator';
  readonly name = 'bad_faith_insurance_claim_calculatorCalculator Calculator';
  readonly description = 'Calculate bad_faith_insurance_claim_calculatorCalculator values';

  calculate(inputs: bad_faith_insurance_claim_calculatorCalculatorInputs): bad_faith_insurance_claim_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bad_faith_insurance_claim_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bad_faith_insurance_claim_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
