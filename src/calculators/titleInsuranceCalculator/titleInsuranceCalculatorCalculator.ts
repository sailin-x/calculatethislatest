import { Calculator } from '../../engines/CalculatorEngine';
import { titleInsuranceCalculatorInputs, titleInsuranceCalculatorResults, titleInsuranceCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class titleInsuranceCalculatorCalculator implements Calculator<titleInsuranceCalculatorInputs, titleInsuranceCalculatorResults> {
  readonly id = 'titleInsuranceCalculator';
  readonly name = 'titleInsuranceCalculator Calculator';
  readonly description = 'Calculate titleInsuranceCalculator values';

  calculate(inputs: titleInsuranceCalculatorInputs): titleInsuranceCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: titleInsuranceCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: titleInsuranceCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
