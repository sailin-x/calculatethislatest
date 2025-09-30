import { Calculator } from '../../engines/CalculatorEngine';
import { tiktok_creator_fund_calculatorCalculatorInputs, tiktok_creator_fund_calculatorCalculatorResults, tiktok_creator_fund_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class tiktok_creator_fund_calculatorCalculatorCalculator implements Calculator<tiktok_creator_fund_calculatorCalculatorInputs, tiktok_creator_fund_calculatorCalculatorResults> {
  readonly id = 'tiktok_creator_fund_calculatorCalculator';
  readonly name = 'tiktok_creator_fund_calculatorCalculator Calculator';
  readonly description = 'Calculate tiktok_creator_fund_calculatorCalculator values';

  calculate(inputs: tiktok_creator_fund_calculatorCalculatorInputs): tiktok_creator_fund_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: tiktok_creator_fund_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: tiktok_creator_fund_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
