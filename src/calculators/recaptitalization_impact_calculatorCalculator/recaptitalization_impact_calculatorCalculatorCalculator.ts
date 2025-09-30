import { Calculator } from '../../engines/CalculatorEngine';
import { recaptitalization_impact_calculatorCalculatorInputs, recaptitalization_impact_calculatorCalculatorResults, recaptitalization_impact_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class recaptitalization_impact_calculatorCalculatorCalculator implements Calculator<recaptitalization_impact_calculatorCalculatorInputs, recaptitalization_impact_calculatorCalculatorResults> {
  readonly id = 'recaptitalization_impact_calculatorCalculator';
  readonly name = 'recaptitalization_impact_calculatorCalculator Calculator';
  readonly description = 'Calculate recaptitalization_impact_calculatorCalculator values';

  calculate(inputs: recaptitalization_impact_calculatorCalculatorInputs): recaptitalization_impact_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: recaptitalization_impact_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: recaptitalization_impact_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
