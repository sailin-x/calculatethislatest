import { Calculator } from '../../engines/CalculatorEngine';
import { recapitalization_impact_calculatorCalculatorInputs, recapitalization_impact_calculatorCalculatorResults, recapitalization_impact_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class recapitalization_impact_calculatorCalculatorCalculator implements Calculator<recapitalization_impact_calculatorCalculatorInputs, recapitalization_impact_calculatorCalculatorResults> {
  readonly id = 'recapitalization_impact_calculatorCalculator';
  readonly name = 'recapitalization_impact_calculatorCalculator Calculator';
  readonly description = 'Calculate recapitalization_impact_calculatorCalculator values';

  calculate(inputs: recapitalization_impact_calculatorCalculatorInputs): recapitalization_impact_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: recapitalization_impact_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: recapitalization_impact_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
