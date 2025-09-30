import { Calculator } from '../../engines/CalculatorEngine';
import { realEstateTaxDeductionsCalculatorInputs, realEstateTaxDeductionsCalculatorResults, realEstateTaxDeductionsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class realEstateTaxDeductionsCalculatorCalculator implements Calculator<realEstateTaxDeductionsCalculatorInputs, realEstateTaxDeductionsCalculatorResults> {
  readonly id = 'realEstateTaxDeductionsCalculator';
  readonly name = 'realEstateTaxDeductionsCalculator Calculator';
  readonly description = 'Calculate realEstateTaxDeductionsCalculator values';

  calculate(inputs: realEstateTaxDeductionsCalculatorInputs): realEstateTaxDeductionsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: realEstateTaxDeductionsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: realEstateTaxDeductionsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
