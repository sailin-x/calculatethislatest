import { Calculator } from '../../engines/CalculatorEngine';
import { collateralization_ratio_calculatorCalculatorInputs, collateralization_ratio_calculatorCalculatorResults, collateralization_ratio_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class collateralization_ratio_calculatorCalculatorCalculator implements Calculator<collateralization_ratio_calculatorCalculatorInputs, collateralization_ratio_calculatorCalculatorResults> {
  readonly id = 'collateralization_ratio_calculatorCalculator';
  readonly name = 'collateralization_ratio_calculatorCalculator Calculator';
  readonly description = 'Calculate collateralization_ratio_calculatorCalculator values';

  calculate(inputs: collateralization_ratio_calculatorCalculatorInputs): collateralization_ratio_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: collateralization_ratio_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: collateralization_ratio_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
