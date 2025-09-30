import { Calculator } from '../../engines/CalculatorEngine';
import { title_insuranceCalculatorInputs, title_insuranceCalculatorResults, title_insuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class title_insuranceCalculatorCalculator implements Calculator<title_insuranceCalculatorInputs, title_insuranceCalculatorResults> {
  readonly id = 'title_insuranceCalculator';
  readonly name = 'title_insuranceCalculator Calculator';
  readonly description = 'Calculate title_insuranceCalculator values';

  calculate(inputs: title_insuranceCalculatorInputs): title_insuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: title_insuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: title_insuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
