import { Calculator } from '../../engines/CalculatorEngine';
import { financial_strategy_calculatorCalculatorInputs, financial_strategy_calculatorCalculatorResults, financial_strategy_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_strategy_calculatorCalculatorCalculator implements Calculator<financial_strategy_calculatorCalculatorInputs, financial_strategy_calculatorCalculatorResults> {
  readonly id = 'financial_strategy_calculatorCalculator';
  readonly name = 'financial_strategy_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_strategy_calculatorCalculator values';

  calculate(inputs: financial_strategy_calculatorCalculatorInputs): financial_strategy_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_strategy_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_strategy_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
