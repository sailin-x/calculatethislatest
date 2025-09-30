import { Calculator } from '../../engines/CalculatorEngine';
import { merger_model_calculatorCalculatorInputs, merger_model_calculatorCalculatorResults, merger_model_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class merger_model_calculatorCalculatorCalculator implements Calculator<merger_model_calculatorCalculatorInputs, merger_model_calculatorCalculatorResults> {
  readonly id = 'merger_model_calculatorCalculator';
  readonly name = 'merger_model_calculatorCalculator Calculator';
  readonly description = 'Calculate merger_model_calculatorCalculator values';

  calculate(inputs: merger_model_calculatorCalculatorInputs): merger_model_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: merger_model_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: merger_model_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
