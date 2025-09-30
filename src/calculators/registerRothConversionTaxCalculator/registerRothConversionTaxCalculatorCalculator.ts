import { Calculator } from '../../engines/CalculatorEngine';
import { registerRothConversionTaxCalculatorInputs, registerRothConversionTaxCalculatorResults, registerRothConversionTaxCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class registerRothConversionTaxCalculatorCalculator implements Calculator<registerRothConversionTaxCalculatorInputs, registerRothConversionTaxCalculatorResults> {
  readonly id = 'registerRothConversionTaxCalculator';
  readonly name = 'registerRothConversionTaxCalculator Calculator';
  readonly description = 'Calculate registerRothConversionTaxCalculator values';

  calculate(inputs: registerRothConversionTaxCalculatorInputs): registerRothConversionTaxCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: registerRothConversionTaxCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: registerRothConversionTaxCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
