import { Calculator } from '../../engines/CalculatorEngine';
import { mortgage_qualificationCalculatorInputs, mortgage_qualificationCalculatorResults, mortgage_qualificationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class mortgage_qualificationCalculatorCalculator implements Calculator<mortgage_qualificationCalculatorInputs, mortgage_qualificationCalculatorResults> {
  readonly id = 'mortgage_qualificationCalculator';
  readonly name = 'mortgage_qualificationCalculator Calculator';
  readonly description = 'Calculate mortgage_qualificationCalculator values';

  calculate(inputs: mortgage_qualificationCalculatorInputs): mortgage_qualificationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: mortgage_qualificationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: mortgage_qualificationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
