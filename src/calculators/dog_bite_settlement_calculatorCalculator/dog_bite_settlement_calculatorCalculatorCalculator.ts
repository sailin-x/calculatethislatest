import { Calculator } from '../../engines/CalculatorEngine';
import { dog_bite_settlement_calculatorCalculatorInputs, dog_bite_settlement_calculatorCalculatorResults, dog_bite_settlement_calculatorCalculatorMetrics } from './types';
import { calculateResult, generateAnalysis } from './formulas';
import { validateInputs } from './validation';

export class dog_bite_settlement_calculatorCalculatorCalculator implements Calculator<dog_bite_settlement_calculatorCalculatorInputs, dog_bite_settlement_calculatorCalculatorResults> {
  readonly id = 'dog_bite_settlement_calculatorCalculator';
  readonly name = 'dog_bite_settlement_calculatorCalculator Calculator';
  readonly description = 'Calculate dog_bite_settlement_calculatorCalculator values';

  calculate(inputs: dog_bite_settlement_calculatorCalculatorInputs): dog_bite_settlement_calculatorCalculatorResults {
    const validation = validateInputs(inputs);
    if (!validation.isValid) {
      throw new Error(`Validation failed: ${validation.errors.join(', ')}`);
    }

    const result = calculateResult(inputs);
    const metrics: dog_bite_settlement_calculatorCalculatorMetrics = { result };
    const analysis = generateAnalysis(inputs, metrics);

    return {
      result,
      analysis: analysis.recommendation
    };
  }

  validate(inputs: dog_bite_settlement_calculatorCalculatorInputs): boolean {
    const validation = validateInputs(inputs);
    return validation.isValid;
  }
}
