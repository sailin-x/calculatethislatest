import { Calculator } from '../../engines/CalculatorEngine';
import { rothConversionTaxCalculatorInputs, rothConversionTaxCalculatorResults, rothConversionTaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class rothConversionTaxCalculatorCalculator implements Calculator<rothConversionTaxCalculatorInputs, rothConversionTaxCalculatorResults> {
  readonly id = 'rothConversionTaxCalculator';
  readonly name = 'rothConversionTaxCalculator Calculator';
  readonly description = 'Calculate rothConversionTaxCalculator values';

  calculate(inputs: rothConversionTaxCalculatorInputs): rothConversionTaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: rothConversionTaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: rothConversionTaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
