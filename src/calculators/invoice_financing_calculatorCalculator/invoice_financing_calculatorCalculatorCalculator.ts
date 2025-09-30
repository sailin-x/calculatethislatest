import { Calculator } from '../../engines/CalculatorEngine';
import { invoice_financing_calculatorCalculatorInputs, invoice_financing_calculatorCalculatorResults, invoice_financing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class invoice_financing_calculatorCalculatorCalculator implements Calculator<invoice_financing_calculatorCalculatorInputs, invoice_financing_calculatorCalculatorResults> {
  readonly id = 'invoice_financing_calculatorCalculator';
  readonly name = 'invoice_financing_calculatorCalculator Calculator';
  readonly description = 'Calculate invoice_financing_calculatorCalculator values';

  calculate(inputs: invoice_financing_calculatorCalculatorInputs): invoice_financing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: invoice_financing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: invoice_financing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
