import { Calculator } from '../../engines/CalculatorEngine';
import { heavy_equipment_depreciation_calculatorCalculatorInputs, heavy_equipment_depreciation_calculatorCalculatorResults, heavy_equipment_depreciation_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class heavy_equipment_depreciation_calculatorCalculatorCalculator implements Calculator<heavy_equipment_depreciation_calculatorCalculatorInputs, heavy_equipment_depreciation_calculatorCalculatorResults> {
  readonly id = 'heavy_equipment_depreciation_calculatorCalculator';
  readonly name = 'heavy_equipment_depreciation_calculatorCalculator Calculator';
  readonly description = 'Calculate heavy_equipment_depreciation_calculatorCalculator values';

  calculate(inputs: heavy_equipment_depreciation_calculatorCalculatorInputs): heavy_equipment_depreciation_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: heavy_equipment_depreciation_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: heavy_equipment_depreciation_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
