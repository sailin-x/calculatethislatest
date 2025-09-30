import { Calculator } from '../../engines/CalculatorEngine';
import { income_based_repayment_calculatorCalculatorInputs, income_based_repayment_calculatorCalculatorResults, income_based_repayment_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class income_based_repayment_calculatorCalculatorCalculator implements Calculator<income_based_repayment_calculatorCalculatorInputs, income_based_repayment_calculatorCalculatorResults> {
  readonly id = 'income_based_repayment_calculatorCalculator';
  readonly name = 'income_based_repayment_calculatorCalculator Calculator';
  readonly description = 'Calculate income_based_repayment_calculatorCalculator values';

  calculate(inputs: income_based_repayment_calculatorCalculatorInputs): income_based_repayment_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: income_based_repayment_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: income_based_repayment_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
