import { Calculator } from '../../engines/CalculatorEngine';
import { roth_conversion_tax_calculatorCalculatorInputs, roth_conversion_tax_calculatorCalculatorResults, roth_conversion_tax_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class roth_conversion_tax_calculatorCalculatorCalculator implements Calculator<roth_conversion_tax_calculatorCalculatorInputs, roth_conversion_tax_calculatorCalculatorResults> {
  readonly id = 'roth_conversion_tax_calculatorCalculator';
  readonly name = 'roth_conversion_tax_calculatorCalculator Calculator';
  readonly description = 'Calculate roth_conversion_tax_calculatorCalculator values';

  calculate(inputs: roth_conversion_tax_calculatorCalculatorInputs): roth_conversion_tax_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: roth_conversion_tax_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: roth_conversion_tax_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
