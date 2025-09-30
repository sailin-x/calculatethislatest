import { Calculator } from '../../engines/CalculatorEngine';
import { bill_of_materials_calculatorCalculatorInputs, bill_of_materials_calculatorCalculatorResults, bill_of_materials_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class bill_of_materials_calculatorCalculatorCalculator implements Calculator<bill_of_materials_calculatorCalculatorInputs, bill_of_materials_calculatorCalculatorResults> {
  readonly id = 'bill_of_materials_calculatorCalculator';
  readonly name = 'bill_of_materials_calculatorCalculator Calculator';
  readonly description = 'Calculate bill_of_materials_calculatorCalculator values';

  calculate(inputs: bill_of_materials_calculatorCalculatorInputs): bill_of_materials_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: bill_of_materials_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: bill_of_materials_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
