import { Calculator } from '../../engines/CalculatorEngine';
import { liability_insurance_calculatorCalculatorInputs, liability_insurance_calculatorCalculatorResults, liability_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class liability_insurance_calculatorCalculatorCalculator implements Calculator<liability_insurance_calculatorCalculatorInputs, liability_insurance_calculatorCalculatorResults> {
  readonly id = 'liability_insurance_calculatorCalculator';
  readonly name = 'liability_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate liability_insurance_calculatorCalculator values';

  calculate(inputs: liability_insurance_calculatorCalculatorInputs): liability_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: liability_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: liability_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
