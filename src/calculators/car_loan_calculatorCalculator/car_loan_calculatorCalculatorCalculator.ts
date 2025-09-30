import { Calculator } from '../../engines/CalculatorEngine';
import { car_loan_calculatorCalculatorInputs, car_loan_calculatorCalculatorResults, car_loan_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class car_loan_calculatorCalculatorCalculator implements Calculator<car_loan_calculatorCalculatorInputs, car_loan_calculatorCalculatorResults> {
  readonly id = 'car_loan_calculatorCalculator';
  readonly name = 'car_loan_calculatorCalculator Calculator';
  readonly description = 'Calculate car_loan_calculatorCalculator values';

  calculate(inputs: car_loan_calculatorCalculatorInputs): car_loan_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: car_loan_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: car_loan_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
