import { Calculator } from '../../engines/CalculatorEngine';
import { cost_of_debt_calculatorCalculatorInputs, cost_of_debt_calculatorCalculatorResults, cost_of_debt_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class cost_of_debt_calculatorCalculatorCalculator implements Calculator<cost_of_debt_calculatorCalculatorInputs, cost_of_debt_calculatorCalculatorResults> {
  readonly id = 'cost_of_debt_calculatorCalculator';
  readonly name = 'cost_of_debt_calculatorCalculator Calculator';
  readonly description = 'Calculate cost_of_debt_calculatorCalculator values';

  calculate(inputs: cost_of_debt_calculatorCalculatorInputs): cost_of_debt_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: cost_of_debt_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: cost_of_debt_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
