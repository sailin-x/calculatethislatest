import { Calculator } from '../../engines/CalculatorEngine';
import { net_promoter_score_calculatorCalculatorInputs, net_promoter_score_calculatorCalculatorResults, net_promoter_score_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_promoter_score_calculatorCalculatorCalculator implements Calculator<net_promoter_score_calculatorCalculatorInputs, net_promoter_score_calculatorCalculatorResults> {
  readonly id = 'net_promoter_score_calculatorCalculator';
  readonly name = 'net_promoter_score_calculatorCalculator Calculator';
  readonly description = 'Calculate net_promoter_score_calculatorCalculator values';

  calculate(inputs: net_promoter_score_calculatorCalculatorInputs): net_promoter_score_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_promoter_score_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_promoter_score_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
