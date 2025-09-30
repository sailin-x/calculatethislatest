import { Calculator } from '../../engines/CalculatorEngine';
import { financial_planning_calculatorCalculatorInputs, financial_planning_calculatorCalculatorResults, financial_planning_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class financial_planning_calculatorCalculatorCalculator implements Calculator<financial_planning_calculatorCalculatorInputs, financial_planning_calculatorCalculatorResults> {
  readonly id = 'financial_planning_calculatorCalculator';
  readonly name = 'financial_planning_calculatorCalculator Calculator';
  readonly description = 'Calculate financial_planning_calculatorCalculator values';

  calculate(inputs: financial_planning_calculatorCalculatorInputs): financial_planning_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: financial_planning_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: financial_planning_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
