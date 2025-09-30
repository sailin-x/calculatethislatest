import { Calculator } from '../../engines/CalculatorEngine';
import { financial_achievement_calculatorCalculatorInputs, financial_achievement_calculatorCalculatorResults, financial_achievement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_achievement_calculatorCalculatorCalculator implements Calculator<financial_achievement_calculatorCalculatorInputs, financial_achievement_calculatorCalculatorResults> {
  readonly id = 'financial_achievement_calculatorCalculator';
  readonly name = 'financial_achievement_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_achievement_calculatorCalculator values';

  calculate(inputs: financial_achievement_calculatorCalculatorInputs): financial_achievement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_achievement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_achievement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
