import { Calculator } from '../../engines/CalculatorEngine';
import { immigration_filing_calculatorCalculatorInputs, immigration_filing_calculatorCalculatorResults, immigration_filing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class immigration_filing_calculatorCalculatorCalculator implements Calculator<immigration_filing_calculatorCalculatorInputs, immigration_filing_calculatorCalculatorResults> {
  readonly id = 'immigration_filing_calculatorCalculator';
  readonly name = 'immigration_filing_calculatorCalculator Calculator';
  readonly description = 'Calculate immigration_filing_calculatorCalculator values';

  calculate(inputs: immigration_filing_calculatorCalculatorInputs): immigration_filing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: immigration_filing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: immigration_filing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
