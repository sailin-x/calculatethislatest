import { Calculator } from '../../engines/CalculatorEngine';
import { flood_risk_zonal_pricing_calculatorCalculatorInputs, flood_risk_zonal_pricing_calculatorCalculatorResults, flood_risk_zonal_pricing_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class flood_risk_zonal_pricing_calculatorCalculatorCalculator implements Calculator<flood_risk_zonal_pricing_calculatorCalculatorInputs, flood_risk_zonal_pricing_calculatorCalculatorResults> {
  readonly id = 'flood_risk_zonal_pricing_calculatorCalculator';
  readonly name = 'flood_risk_zonal_pricing_calculatorCalculator Calculator';
  readonly description = 'Calculate flood_risk_zonal_pricing_calculatorCalculator values';

  calculate(inputs: flood_risk_zonal_pricing_calculatorCalculatorInputs): flood_risk_zonal_pricing_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: flood_risk_zonal_pricing_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: flood_risk_zonal_pricing_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
