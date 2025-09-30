import { Calculator } from '../../engines/CalculatorEngine';
import { term_life_insuranceCalculatorInputs, term_life_insuranceCalculatorResults, term_life_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class term_life_insuranceCalculatorCalculator implements Calculator<term_life_insuranceCalculatorInputs, term_life_insuranceCalculatorResults> {
  readonly id = 'term_life_insuranceCalculator';
  readonly name = 'term_life_insuranceCalculator Calculator';
  readonly description = 'Calculate term_life_insuranceCalculator values';

  calculate(inputs: term_life_insuranceCalculatorInputs): term_life_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: term_life_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: term_life_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
