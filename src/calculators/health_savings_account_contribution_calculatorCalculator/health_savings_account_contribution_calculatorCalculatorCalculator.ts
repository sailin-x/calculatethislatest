import { Calculator } from '../../engines/CalculatorEngine';
import { health_savings_account_contribution_calculatorCalculatorInputs, health_savings_account_contribution_calculatorCalculatorResults, health_savings_account_contribution_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class health_savings_account_contribution_calculatorCalculatorCalculator implements Calculator<health_savings_account_contribution_calculatorCalculatorInputs, health_savings_account_contribution_calculatorCalculatorResults> {
  readonly id = 'health_savings_account_contribution_calculatorCalculator';
  readonly name = 'health_savings_account_contribution_calculatorCalculator Calculator';
  readonly description = 'Calculate health_savings_account_contribution_calculatorCalculator values';

  calculate(inputs: health_savings_account_contribution_calculatorCalculatorInputs): health_savings_account_contribution_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: health_savings_account_contribution_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: health_savings_account_contribution_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
