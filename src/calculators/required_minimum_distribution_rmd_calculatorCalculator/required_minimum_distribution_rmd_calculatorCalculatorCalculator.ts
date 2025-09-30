import { Calculator } from '../../engines/CalculatorEngine';
import { required_minimum_distribution_rmd_calculatorCalculatorInputs, required_minimum_distribution_rmd_calculatorCalculatorResults, required_minimum_distribution_rmd_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class required_minimum_distribution_rmd_calculatorCalculatorCalculator implements Calculator<required_minimum_distribution_rmd_calculatorCalculatorInputs, required_minimum_distribution_rmd_calculatorCalculatorResults> {
  readonly id = 'required_minimum_distribution_rmd_calculatorCalculator';
  readonly name = 'required_minimum_distribution_rmd_calculatorCalculator Calculator';
  readonly description = 'Calculate required_minimum_distribution_rmd_calculatorCalculator values';

  calculate(inputs: required_minimum_distribution_rmd_calculatorCalculatorInputs): required_minimum_distribution_rmd_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: required_minimum_distribution_rmd_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: required_minimum_distribution_rmd_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
