import { Calculator } from '../../engines/CalculatorEngine';
import { composting_savings_calculatorCalculatorInputs, composting_savings_calculatorCalculatorResults, composting_savings_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class composting_savings_calculatorCalculatorCalculator implements Calculator<composting_savings_calculatorCalculatorInputs, composting_savings_calculatorCalculatorResults> {
  readonly id = 'composting_savings_calculatorCalculator';
  readonly name = 'composting_savings_calculatorCalculator Calculator';
  readonly description = 'Calculate composting_savings_calculatorCalculator values';

  calculate(inputs: composting_savings_calculatorCalculatorInputs): composting_savings_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: composting_savings_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: composting_savings_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
