import { Calculator } from '../../engines/CalculatorEngine';
import { overall_equipment_effectiveness_oee_calculatorCalculatorInputs, overall_equipment_effectiveness_oee_calculatorCalculatorResults, overall_equipment_effectiveness_oee_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class overall_equipment_effectiveness_oee_calculatorCalculatorCalculator implements Calculator<overall_equipment_effectiveness_oee_calculatorCalculatorInputs, overall_equipment_effectiveness_oee_calculatorCalculatorResults> {
  readonly id = 'overall_equipment_effectiveness_oee_calculatorCalculator';
  readonly name = 'overall_equipment_effectiveness_oee_calculatorCalculator Calculator';
  readonly description = 'Calculate overall_equipment_effectiveness_oee_calculatorCalculator values';

  calculate(inputs: overall_equipment_effectiveness_oee_calculatorCalculatorInputs): overall_equipment_effectiveness_oee_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: overall_equipment_effectiveness_oee_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: overall_equipment_effectiveness_oee_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
