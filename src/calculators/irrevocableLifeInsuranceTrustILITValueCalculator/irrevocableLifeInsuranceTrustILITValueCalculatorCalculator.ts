import { Calculator } from '../../engines/CalculatorEngine';
import { irrevocableLifeInsuranceTrustILITValueCalculatorInputs, irrevocableLifeInsuranceTrustILITValueCalculatorResults, irrevocableLifeInsuranceTrustILITValueCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class irrevocableLifeInsuranceTrustILITValueCalculatorCalculator implements Calculator<irrevocableLifeInsuranceTrustILITValueCalculatorInputs, irrevocableLifeInsuranceTrustILITValueCalculatorResults> {
  readonly id = 'irrevocableLifeInsuranceTrustILITValueCalculator';
  readonly name = 'irrevocableLifeInsuranceTrustILITValueCalculator Calculator';
  readonly description = 'Calculate irrevocableLifeInsuranceTrustILITValueCalculator values';

  calculate(inputs: irrevocableLifeInsuranceTrustILITValueCalculatorInputs): irrevocableLifeInsuranceTrustILITValueCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: irrevocableLifeInsuranceTrustILITValueCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: irrevocableLifeInsuranceTrustILITValueCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
