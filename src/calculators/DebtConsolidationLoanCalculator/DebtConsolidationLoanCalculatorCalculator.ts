import { Calculator } from '../../engines/CalculatorEngine';
import { DebtConsolidationLoanCalculatorInputs, DebtConsolidationLoanCalculatorResults, DebtConsolidationLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class DebtConsolidationLoanCalculatorCalculator implements Calculator<DebtConsolidationLoanCalculatorInputs, DebtConsolidationLoanCalculatorResults> {
  readonly id = 'DebtConsolidationLoanCalculator';
  readonly name = 'DebtConsolidationLoanCalculator Calculator';
  readonly description = 'Calculate DebtConsolidationLoanCalculator values';

  calculate(inputs: DebtConsolidationLoanCalculatorInputs): DebtConsolidationLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: DebtConsolidationLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: DebtConsolidationLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
