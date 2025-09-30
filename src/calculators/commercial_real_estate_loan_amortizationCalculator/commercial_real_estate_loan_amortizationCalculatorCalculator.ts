import { Calculator } from '../../engines/CalculatorEngine';
import { commercial_real_estate_loan_amortizationCalculatorInputs, commercial_real_estate_loan_amortizationCalculatorResults, commercial_real_estate_loan_amortizationCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class commercial_real_estate_loan_amortizationCalculatorCalculator implements Calculator<commercial_real_estate_loan_amortizationCalculatorInputs, commercial_real_estate_loan_amortizationCalculatorResults> {
  readonly id = 'commercial_real_estate_loan_amortizationCalculator';
  readonly name = 'commercial_real_estate_loan_amortizationCalculator Calculator';
  readonly description = 'Calculate commercial_real_estate_loan_amortizationCalculator values';

  calculate(inputs: commercial_real_estate_loan_amortizationCalculatorInputs): commercial_real_estate_loan_amortizationCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: commercial_real_estate_loan_amortizationCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: commercial_real_estate_loan_amortizationCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
