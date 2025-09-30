import { Calculator } from '../../engines/CalculatorEngine';
import { distribution_waterfall_model_calculatorCalculatorInputs, distribution_waterfall_model_calculatorCalculatorResults, distribution_waterfall_model_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class distribution_waterfall_model_calculatorCalculatorCalculator implements Calculator<distribution_waterfall_model_calculatorCalculatorInputs, distribution_waterfall_model_calculatorCalculatorResults> {
  readonly id = 'distribution_waterfall_model_calculatorCalculator';
  readonly name = 'distribution_waterfall_model_calculatorCalculator Calculator';
  readonly description = 'Calculate distribution_waterfall_model_calculatorCalculator values';

  calculate(inputs: distribution_waterfall_model_calculatorCalculatorInputs): distribution_waterfall_model_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: distribution_waterfall_model_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: distribution_waterfall_model_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
