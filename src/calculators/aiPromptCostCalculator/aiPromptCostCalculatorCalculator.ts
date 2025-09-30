import { Calculator } from '../../engines/CalculatorEngine';
import { aiPromptCostCalculatorInputs, aiPromptCostCalculatorResults, aiPromptCostCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class aiPromptCostCalculatorCalculator implements Calculator<aiPromptCostCalculatorInputs, aiPromptCostCalculatorResults> {
  readonly id = 'aiPromptCostCalculator';
  readonly name = 'aiPromptCostCalculator Calculator';
  readonly description = 'Calculate aiPromptCostCalculator values';

  calculate(inputs: aiPromptCostCalculatorInputs): aiPromptCostCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: aiPromptCostCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: aiPromptCostCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
