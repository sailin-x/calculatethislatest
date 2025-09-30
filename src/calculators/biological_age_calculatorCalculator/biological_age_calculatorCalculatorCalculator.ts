import { Calculator } from '../../engines/CalculatorEngine';
import { biological_age_calculatorCalculatorInputs, biological_age_calculatorCalculatorResults, biological_age_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class biological_age_calculatorCalculatorCalculator implements Calculator<biological_age_calculatorCalculatorInputs, biological_age_calculatorCalculatorResults> {
  readonly id = 'biological_age_calculatorCalculator';
  readonly name = 'biological_age_calculatorCalculator Calculator';
  readonly description = 'Calculate biological_age_calculatorCalculator values';

  calculate(inputs: biological_age_calculatorCalculatorInputs): biological_age_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: biological_age_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: biological_age_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
