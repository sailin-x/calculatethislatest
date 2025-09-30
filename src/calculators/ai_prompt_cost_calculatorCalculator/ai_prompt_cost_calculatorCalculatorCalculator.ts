import { Calculator } from '../../engines/CalculatorEngine';
import { ai_prompt_cost_calculatorCalculatorInputs, ai_prompt_cost_calculatorCalculatorResults, ai_prompt_cost_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class ai_prompt_cost_calculatorCalculatorCalculator implements Calculator<ai_prompt_cost_calculatorCalculatorInputs, ai_prompt_cost_calculatorCalculatorResults> {
  readonly id = 'ai_prompt_cost_calculatorCalculator';
  readonly name = 'ai_prompt_cost_calculatorCalculator Calculator';
  readonly description = 'Calculate ai_prompt_cost_calculatorCalculator values';

  calculate(inputs: ai_prompt_cost_calculatorCalculatorInputs): ai_prompt_cost_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: ai_prompt_cost_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: ai_prompt_cost_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
