import { Calculator } from '../../engines/CalculatorEngine';
import { required_beginning_date_rmd_calculatorCalculatorInputs, required_beginning_date_rmd_calculatorCalculatorResults, required_beginning_date_rmd_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class required_beginning_date_rmd_calculatorCalculatorCalculator implements Calculator<required_beginning_date_rmd_calculatorCalculatorInputs, required_beginning_date_rmd_calculatorCalculatorResults> {
  readonly id = 'required_beginning_date_rmd_calculatorCalculator';
  readonly name = 'required_beginning_date_rmd_calculatorCalculator Calculator';
  readonly description = 'Calculate required_beginning_date_rmd_calculatorCalculator values';

  calculate(inputs: required_beginning_date_rmd_calculatorCalculatorInputs): required_beginning_date_rmd_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: required_beginning_date_rmd_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: required_beginning_date_rmd_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
