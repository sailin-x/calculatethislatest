import { Calculator } from '../../engines/CalculatorEngine';
import { ai_prompt_costCalculatorInputs, ai_prompt_costCalculatorResults, ai_prompt_costCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ai_prompt_costCalculatorCalculator implements Calculator<ai_prompt_costCalculatorInputs, ai_prompt_costCalculatorResults> {
  readonly id = 'ai_prompt_costCalculator';
  readonly name = 'ai_prompt_costCalculator Calculator';
  readonly description = 'Calculate ai_prompt_costCalculator values';

  calculate(inputs: ai_prompt_costCalculatorInputs): ai_prompt_costCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ai_prompt_costCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ai_prompt_costCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
