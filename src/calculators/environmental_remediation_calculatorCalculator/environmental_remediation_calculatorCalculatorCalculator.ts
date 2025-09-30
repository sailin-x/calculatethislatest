import { Calculator } from '../../engines/CalculatorEngine';
import { environmental_remediation_calculatorCalculatorInputs, environmental_remediation_calculatorCalculatorResults, environmental_remediation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class environmental_remediation_calculatorCalculatorCalculator implements Calculator<environmental_remediation_calculatorCalculatorInputs, environmental_remediation_calculatorCalculatorResults> {
  readonly id = 'environmental_remediation_calculatorCalculator';
  readonly name = 'environmental_remediation_calculatorCalculator Calculator';
  readonly description = 'Calculate environmental_remediation_calculatorCalculator values';

  calculate(inputs: environmental_remediation_calculatorCalculatorInputs): environmental_remediation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: environmental_remediation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: environmental_remediation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
