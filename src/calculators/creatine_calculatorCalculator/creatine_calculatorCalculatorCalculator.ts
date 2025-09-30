import { Calculator } from '../../engines/CalculatorEngine';
import { creatine_calculatorCalculatorInputs, creatine_calculatorCalculatorResults, creatine_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class creatine_calculatorCalculatorCalculator implements Calculator<creatine_calculatorCalculatorInputs, creatine_calculatorCalculatorResults> {
  readonly id = 'creatine_calculatorCalculator';
  readonly name = 'creatine_calculatorCalculator Calculator';
  readonly description = 'Calculate creatine_calculatorCalculator values';

  calculate(inputs: creatine_calculatorCalculatorInputs): creatine_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: creatine_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: creatine_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
