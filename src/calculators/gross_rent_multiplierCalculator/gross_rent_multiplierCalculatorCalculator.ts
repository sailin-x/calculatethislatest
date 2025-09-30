import { Calculator } from '../../engines/CalculatorEngine';
import { gross_rent_multiplierCalculatorInputs, gross_rent_multiplierCalculatorResults, gross_rent_multiplierCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class gross_rent_multiplierCalculatorCalculator implements Calculator<gross_rent_multiplierCalculatorInputs, gross_rent_multiplierCalculatorResults> {
  readonly id = 'gross_rent_multiplierCalculator';
  readonly name = 'gross_rent_multiplierCalculator Calculator';
  readonly description = 'Calculate gross_rent_multiplierCalculator values';

  calculate(inputs: gross_rent_multiplierCalculatorInputs): gross_rent_multiplierCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: gross_rent_multiplierCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: gross_rent_multiplierCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
