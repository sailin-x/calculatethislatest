import { Calculator } from '../../engines/CalculatorEngine';
import { renters_insurance_calculatorCalculatorInputs, renters_insurance_calculatorCalculatorResults, renters_insurance_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class renters_insurance_calculatorCalculatorCalculator implements Calculator<renters_insurance_calculatorCalculatorInputs, renters_insurance_calculatorCalculatorResults> {
  readonly id = 'renters_insurance_calculatorCalculator';
  readonly name = 'renters_insurance_calculatorCalculator Calculator';
  readonly description = 'Calculate renters_insurance_calculatorCalculator values';

  calculate(inputs: renters_insurance_calculatorCalculatorInputs): renters_insurance_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: renters_insurance_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: renters_insurance_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
