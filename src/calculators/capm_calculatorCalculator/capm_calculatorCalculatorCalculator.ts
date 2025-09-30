import { Calculator } from '../../engines/CalculatorEngine';
import { capm_calculatorCalculatorInputs, capm_calculatorCalculatorResults, capm_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class capm_calculatorCalculatorCalculator implements Calculator<capm_calculatorCalculatorInputs, capm_calculatorCalculatorResults> {
  readonly id = 'capm_calculatorCalculator';
  readonly name = 'capm_calculatorCalculator Calculator';
  readonly description = 'Calculate capm_calculatorCalculator values';

  calculate(inputs: capm_calculatorCalculatorInputs): capm_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: capm_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: capm_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
