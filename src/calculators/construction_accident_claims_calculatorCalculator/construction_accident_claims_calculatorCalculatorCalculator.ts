import { Calculator } from '../../engines/CalculatorEngine';
import { construction_accident_claims_calculatorCalculatorInputs, construction_accident_claims_calculatorCalculatorResults, construction_accident_claims_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class construction_accident_claims_calculatorCalculatorCalculator implements Calculator<construction_accident_claims_calculatorCalculatorInputs, construction_accident_claims_calculatorCalculatorResults> {
  readonly id = 'construction_accident_claims_calculatorCalculator';
  readonly name = 'construction_accident_claims_calculatorCalculator Calculator';
  readonly description = 'Calculate construction_accident_claims_calculatorCalculator values';

  calculate(inputs: construction_accident_claims_calculatorCalculatorInputs): construction_accident_claims_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: construction_accident_claims_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: construction_accident_claims_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
