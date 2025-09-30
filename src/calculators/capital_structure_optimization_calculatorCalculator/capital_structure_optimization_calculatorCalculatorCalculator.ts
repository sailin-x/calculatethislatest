import { Calculator } from '../../engines/CalculatorEngine';
import { capital_structure_optimization_calculatorCalculatorInputs, capital_structure_optimization_calculatorCalculatorResults, capital_structure_optimization_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class capital_structure_optimization_calculatorCalculatorCalculator implements Calculator<capital_structure_optimization_calculatorCalculatorInputs, capital_structure_optimization_calculatorCalculatorResults> {
  readonly id = 'capital_structure_optimization_calculatorCalculator';
  readonly name = 'capital_structure_optimization_calculatorCalculator Calculator';
  readonly description = 'Calculate capital_structure_optimization_calculatorCalculator values';

  calculate(inputs: capital_structure_optimization_calculatorCalculatorInputs): capital_structure_optimization_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: capital_structure_optimization_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: capital_structure_optimization_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
