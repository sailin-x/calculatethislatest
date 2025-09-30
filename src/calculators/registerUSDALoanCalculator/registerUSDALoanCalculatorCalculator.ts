import { Calculator } from '../../engines/CalculatorEngine';
import { registerUSDALoanCalculatorInputs, registerUSDALoanCalculatorResults, registerUSDALoanCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerUSDALoanCalculatorCalculator implements Calculator<registerUSDALoanCalculatorInputs, registerUSDALoanCalculatorResults> {
  readonly id = 'registerUSDALoanCalculator';
  readonly name = 'registerUSDALoanCalculator Calculator';
  readonly description = 'Calculate registerUSDALoanCalculator values';

  calculate(inputs: registerUSDALoanCalculatorInputs): registerUSDALoanCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerUSDALoanCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerUSDALoanCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
