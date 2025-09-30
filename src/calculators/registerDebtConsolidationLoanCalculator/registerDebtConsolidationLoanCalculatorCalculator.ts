import { Calculator } from '../../engines/CalculatorEngine';
import { registerDebtConsolidationLoanCalculatorInputs, registerDebtConsolidationLoanCalculatorResults, registerDebtConsolidationLoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerDebtConsolidationLoanCalculatorCalculator implements Calculator<registerDebtConsolidationLoanCalculatorInputs, registerDebtConsolidationLoanCalculatorResults> {
  readonly id = 'registerDebtConsolidationLoanCalculator';
  readonly name = 'registerDebtConsolidationLoanCalculator Calculator';
  readonly description = 'Calculate registerDebtConsolidationLoanCalculator values';

  calculate(inputs: registerDebtConsolidationLoanCalculatorInputs): registerDebtConsolidationLoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerDebtConsolidationLoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerDebtConsolidationLoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
