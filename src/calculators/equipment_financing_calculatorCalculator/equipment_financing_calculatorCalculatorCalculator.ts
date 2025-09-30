import { Calculator } from '../../engines/CalculatorEngine';
import { equipment_financing_calculatorCalculatorInputs, equipment_financing_calculatorCalculatorResults, equipment_financing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class equipment_financing_calculatorCalculatorCalculator implements Calculator<equipment_financing_calculatorCalculatorInputs, equipment_financing_calculatorCalculatorResults> {
  readonly id = 'equipment_financing_calculatorCalculator';
  readonly name = 'equipment_financing_calculatorCalculator Calculator';
  readonly description = 'Calculate equipment_financing_calculatorCalculator values';

  calculate(inputs: equipment_financing_calculatorCalculatorInputs): equipment_financing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: equipment_financing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: equipment_financing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
