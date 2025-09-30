import { Calculator } from '../../engines/CalculatorEngine';
import { human_capital_due_diligence_calculatorCalculatorInputs, human_capital_due_diligence_calculatorCalculatorResults, human_capital_due_diligence_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class human_capital_due_diligence_calculatorCalculatorCalculator implements Calculator<human_capital_due_diligence_calculatorCalculatorInputs, human_capital_due_diligence_calculatorCalculatorResults> {
  readonly id = 'human_capital_due_diligence_calculatorCalculator';
  readonly name = 'human_capital_due_diligence_calculatorCalculator Calculator';
  readonly description = 'Calculate human_capital_due_diligence_calculatorCalculator values';

  calculate(inputs: human_capital_due_diligence_calculatorCalculatorInputs): human_capital_due_diligence_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: human_capital_due_diligence_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: human_capital_due_diligence_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
