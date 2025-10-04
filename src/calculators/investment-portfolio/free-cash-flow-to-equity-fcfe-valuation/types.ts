export interface FreeCashFlowToEquityFcfeValuationInputs {
  // Define input properties based on the calculator's requirements
  primaryInput: number;
  secondaryInput?: number;
  selectInput: string;
  // Add more input properties as needed
  optionalParameter?: string;
  booleanFlag?: boolean;
}

export interface FreeCashFlowToEquityFcfeValuationOutputs {
  // Define output properties that the calculator will produce
  primaryResult: number;
  secondaryResult: number;
  // Add more output properties as needed
  percentageResult?: number;
  textResult?: string;
}

export interface FreeCashFlowToEquityFcfeValuationMetrics {
  // Define intermediate calculation results or metrics
  intermediateValue: number;
  calculationSteps: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface FreeCashFlowToEquityFcfeValuationAnalysis {
  // Define analysis results
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  insights: string[];
  warnings: string[];
}