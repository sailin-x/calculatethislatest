import { Calculator } from '../../engines/CalculatorEngine';
import { net_promoter_score_nps_calculatorCalculatorInputs, net_promoter_score_nps_calculatorCalculatorResults, net_promoter_score_nps_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class net_promoter_score_nps_calculatorCalculatorCalculator implements Calculator<net_promoter_score_nps_calculatorCalculatorInputs, net_promoter_score_nps_calculatorCalculatorResults> {
  readonly id = 'net_promoter_score_nps_calculatorCalculator';
  readonly name = 'net_promoter_score_nps_calculatorCalculator Calculator';
  readonly description = 'Calculate net_promoter_score_nps_calculatorCalculator values';

  calculate(inputs: net_promoter_score_nps_calculatorCalculatorInputs): net_promoter_score_nps_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: net_promoter_score_nps_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: net_promoter_score_nps_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
