import { Calculator } from '../../engines/CalculatorEngine';
import { media_mix_modeling_calculatorCalculatorInputs, media_mix_modeling_calculatorCalculatorResults, media_mix_modeling_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class media_mix_modeling_calculatorCalculatorCalculator implements Calculator<media_mix_modeling_calculatorCalculatorInputs, media_mix_modeling_calculatorCalculatorResults> {
  readonly id = 'media_mix_modeling_calculatorCalculator';
  readonly name = 'media_mix_modeling_calculatorCalculator Calculator';
  readonly description = 'Calculate media_mix_modeling_calculatorCalculator values';

  calculate(inputs: media_mix_modeling_calculatorCalculatorInputs): media_mix_modeling_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: media_mix_modeling_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: media_mix_modeling_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
