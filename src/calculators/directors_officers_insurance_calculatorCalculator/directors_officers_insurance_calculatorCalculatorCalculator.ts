import { Calculator } from '../../engines/CalculatorEngine';
import { directors_officers_insurance_calculatorCalculatorInputs, directors_officers_insurance_calculatorCalculatorResults, directors_officers_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class directors_officers_insurance_calculatorCalculatorCalculator implements Calculator<directors_officers_insurance_calculatorCalculatorInputs, directors_officers_insurance_calculatorCalculatorResults> {
  readonly id = 'directors_officers_insurance_calculatorCalculator';
  readonly name = 'directors_officers_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate directors_officers_insurance_calculatorCalculator values';

  calculate(inputs: directors_officers_insurance_calculatorCalculatorInputs): directors_officers_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: directors_officers_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: directors_officers_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
