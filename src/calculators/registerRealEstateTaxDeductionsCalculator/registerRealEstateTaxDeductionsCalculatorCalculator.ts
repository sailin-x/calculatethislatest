import { Calculator } from '../../engines/CalculatorEngine';
import { registerRealEstateTaxDeductionsCalculatorInputs, registerRealEstateTaxDeductionsCalculatorResults, registerRealEstateTaxDeductionsCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRealEstateTaxDeductionsCalculatorCalculator implements Calculator<registerRealEstateTaxDeductionsCalculatorInputs, registerRealEstateTaxDeductionsCalculatorResults> {
  readonly id = 'registerRealEstateTaxDeductionsCalculator';
  readonly name = 'registerRealEstateTaxDeductionsCalculator Calculator';
  readonly description = 'Calculate registerRealEstateTaxDeductionsCalculator values';

  calculate(inputs: registerRealEstateTaxDeductionsCalculatorInputs): registerRealEstateTaxDeductionsCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRealEstateTaxDeductionsCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRealEstateTaxDeductionsCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
