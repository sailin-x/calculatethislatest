import { Calculator } from '../../engines/CalculatorEngine';
import { epa_fine_calculatorCalculatorInputs, epa_fine_calculatorCalculatorResults, epa_fine_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class epa_fine_calculatorCalculatorCalculator implements Calculator<epa_fine_calculatorCalculatorInputs, epa_fine_calculatorCalculatorResults> {
  readonly id = 'epa_fine_calculatorCalculator';
  readonly name = 'epa_fine_calculatorCalculator Calculator';
  readonly description = 'Calculate epa_fine_calculatorCalculator values';

  calculate(inputs: epa_fine_calculatorCalculatorInputs): epa_fine_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: epa_fine_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: epa_fine_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
