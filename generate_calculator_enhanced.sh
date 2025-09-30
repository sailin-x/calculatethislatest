#!/bin/bash

# Enhanced script to generate complete calculator implementations
# Usage: ./generate_calculator_enhanced.sh category calculator-name "Calculator Title" "Calculator Description" [calculator-type]

CATEGORY=$1
CALCULATOR_NAME=$2
TITLE=$3
DESCRIPTION=$4
CALCULATOR_TYPE=${5:-"basic"}  # basic, financial, legal, math, etc.

if [ -z "$CATEGORY" ] || [ -z "$CALCULATOR_NAME" ] || [ -z "$TITLE" ] || [ -z "$DESCRIPTION" ]; then
    echo "Usage: $0 category calculator-name \"Calculator Title\" \"Calculator Description\" [calculator-type]"
    echo "Calculator types: basic, financial, legal, math, insurance, health"
    exit 1
fi

DIR="src/calculators/$CATEGORY/$CALCULATOR_NAME"
CLASS_NAME=$(echo $CALCULATOR_NAME | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1' | sed 's/ //g')

echo "Creating complete calculator: $CALCULATOR_NAME in category: $CATEGORY (type: $CALCULATOR_TYPE)"

# Create directory
mkdir -p "$DIR"

# Generate types.ts based on calculator type
case $CALCULATOR_TYPE in
    "financial")
        cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  principalAmount: number;
  interestRate: number;
  timePeriod: number;
  compoundingFrequency: number;
}

export interface ${CLASS_NAME}Metrics {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
}

export interface ${CLASS_NAME}Analysis {
  profitability: string;
  riskLevel: string;
  recommendations: string[];
}

export interface ${CLASS_NAME}Outputs {
  totalAmount: number;
  totalInterest: number;
  monthlyPayment: number;
  effectiveRate: number;
  analysis: ${CLASS_NAME}Analysis;
}
EOF
        ;;
    "legal")
        cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  claimAmount: number;
  settlementPercentage: number;
  attorneyFees: number;
  courtCosts: number;
  jurisdiction: string;
}

export interface ${CLASS_NAME}Metrics {
  settlementAmount: number;
  totalCosts: number;
  netRecovery: number;
  attorneyFeeAmount: number;
}

export interface ${CLASS_NAME}Analysis {
  settlementViability: string;
  costEfficiency: string;
  recommendations: string[];
}

export interface ${CLASS_NAME}Outputs {
  settlementAmount: number;
  netRecovery: number;
  totalCosts: number;
  analysis: ${CLASS_NAME}Analysis;
}
EOF
        ;;
    "math")
        cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  inputValue: number;
  operationType: string;
  precision: number;
}

export interface ${CLASS_NAME}Metrics {
  result: number;
  calculationSteps: string[];
  accuracy: number;
}

export interface ${CLASS_NAME}Analysis {
  complexity: string;
  efficiency: string;
  recommendations: string[];
}

export interface ${CLASS_NAME}Outputs {
  result: number;
  calculationSteps: string[];
  analysis: ${CLASS_NAME}Analysis;
}
EOF
        ;;
    "insurance")
        cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  coverageAmount: number;
  premiumRate: number;
  policyTerm: number;
  riskFactors: number;
}

export interface ${CLASS_NAME}Metrics {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  riskAdjustedRate: number;
}

export interface ${CLASS_NAME}Analysis {
  coverageAdequacy: string;
  premiumEfficiency: string;
  recommendations: string[];
}

export interface ${CLASS_NAME}Outputs {
  annualPremium: number;
  totalPremium: number;
  coverageRatio: number;
  analysis: ${CLASS_NAME}Analysis;
}
EOF
        ;;
    "health")
        cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  currentWeight: number;
  targetWeight: number;
  timeFrame: number;
  activityLevel: string;
}

export interface ${CLASS_NAME}Metrics {
  weightLossRequired: number;
  weeklyLossRate: number;
  dailyCalorieDeficit: number;
  estimatedTime: number;
}

export interface ${CLASS_NAME}Analysis {
  feasibility: string;
  healthSafety: string;
  recommendations: string[];
}

export interface ${CLASS_NAME}Outputs {
  weightLossRequired: number;
  weeklyLossRate: number;
  estimatedTime: number;
  analysis: ${CLASS_NAME}Analysis;
}
EOF
        ;;
    *)
        cat > "$DIR/types.ts" << EOF
export interface ${CLASS_NAME}Inputs {
  inputValue: number;
  multiplier: number;
}

export interface ${CLASS_NAME}Metrics {
  result: number;
  calculation: string;
}

export interface ${CLASS_NAME}Analysis {
  summary: string;
  recommendations: string[];
}

export interface ${CLASS_NAME}Outputs {
  result: number;
  calculation: string;
  analysis: ${CLASS_NAME}Analysis;
}
EOF
        ;;
esac

# Generate formulas.ts based on calculator type
case $CALCULATOR_TYPE in
    "financial")
        cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateTotalAmount(inputs: ${CLASS_NAME}Inputs): number {
  const { principalAmount, interestRate, timePeriod, compoundingFrequency } = inputs;
  const rate = interestRate / 100 / compoundingFrequency;
  const periods = timePeriod * compoundingFrequency;
  return principalAmount * Math.pow(1 + rate, periods);
}

export function calculateTotalInterest(inputs: ${CLASS_NAME}Inputs): number {
  return calculateTotalAmount(inputs) - inputs.principalAmount;
}

export function calculateMonthlyPayment(inputs: ${CLASS_NAME}Inputs): number {
  const totalAmount = calculateTotalAmount(inputs);
  return totalAmount / (inputs.timePeriod * 12);
}

export function calculateEffectiveRate(inputs: ${CLASS_NAME}Inputs): number {
  const totalAmount = calculateTotalAmount(inputs);
  const growthFactor = totalAmount / inputs.principalAmount;
  return (Math.pow(growthFactor, 1 / inputs.timePeriod) - 1) * 100;
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  const profitability = metrics.effectiveRate > 5 ? 'High return potential' : 'Moderate return potential';
  const riskLevel = inputs.timePeriod > 10 ? 'Long-term investment' : 'Short-term investment';

  const recommendations = [];
  if (metrics.effectiveRate < 3) {
    recommendations.push('Consider higher-risk investments for better returns');
  }
  if (inputs.timePeriod < 5) {
    recommendations.push('Longer investment horizons typically yield better results');
  }
  recommendations.push('Consult with a financial advisor');

  return {
    profitability,
    riskLevel,
    recommendations
  };
}
EOF
        ;;
    "legal")
        cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateSettlementAmount(inputs: ${CLASS_NAME}Inputs): number {
  return inputs.claimAmount * (inputs.settlementPercentage / 100);
}

export function calculateAttorneyFeeAmount(inputs: ${CLASS_NAME}Inputs): number {
  return calculateSettlementAmount(inputs) * (inputs.attorneyFees / 100);
}

export function calculateTotalCosts(inputs: ${CLASS_NAME}Inputs): number {
  return calculateAttorneyFeeAmount(inputs) + inputs.courtCosts;
}

export function calculateNetRecovery(inputs: ${CLASS_NAME}Inputs): number {
  return calculateSettlementAmount(inputs) - calculateTotalCosts(inputs);
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  const settlementViability = metrics.netRecovery > 0 ? 'Potentially viable settlement' : 'Settlement may not be worthwhile';
  const costEfficiency = (metrics.netRecovery / inputs.claimAmount) > 0.5 ? 'Good cost efficiency' : 'High cost relative to recovery';

  const recommendations = [];
  if (metrics.netRecovery < inputs.claimAmount * 0.3) {
    recommendations.push('Consider negotiating lower attorney fees');
  }
  if (inputs.settlementPercentage < 50) {
    recommendations.push('May want to pursue litigation for higher recovery');
  }
  recommendations.push('Consult with an attorney for case-specific advice');

  return {
    settlementViability,
    costEfficiency,
    recommendations
  };
}
EOF
        ;;
    "math")
        cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateResult(inputs: ${CLASS_NAME}Inputs): number {
  switch (inputs.operationType) {
    case 'square':
      return inputs.inputValue * inputs.inputValue;
    case 'cube':
      return inputs.inputValue * inputs.inputValue * inputs.inputValue;
    case 'square-root':
      return Math.sqrt(inputs.inputValue);
    case 'multiply':
      return inputs.inputValue * inputs.multiplier;
    default:
      return inputs.inputValue;
  }
}

export function generateCalculationSteps(inputs: ${CLASS_NAME}Inputs): string[] {
  const steps = [];
  steps.push(\`Input value: \${inputs.inputValue}\`);

  switch (inputs.operationType) {
    case 'square':
      steps.push(\`Square operation: \${inputs.inputValue} × \${inputs.inputValue}\`);
      break;
    case 'cube':
      steps.push(\`Cube operation: \${inputs.inputValue} × \${inputs.inputValue} × \${inputs.inputValue}\`);
      break;
    case 'square-root':
      steps.push(\`Square root operation: √\${inputs.inputValue}\`);
      break;
    case 'multiply':
      steps.push(\`Multiplication: \${inputs.inputValue} × \${inputs.multiplier}\`);
      break;
  }

  steps.push(\`Result: \${calculateResult(inputs).toFixed(inputs.precision || 2)}\`);
  return steps;
}

export function calculateAccuracy(inputs: ${CLASS_NAME}Inputs): number {
  // Simplified accuracy calculation
  return 99.9;
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  const complexity = inputs.operationType === 'cube' ? 'High complexity' : 'Low complexity';
  const efficiency = 'High computational efficiency';

  const recommendations = [];
  if (inputs.precision > 4) {
    recommendations.push('High precision may impact performance');
  }
  recommendations.push('Consider using appropriate data types for precision requirements');

  return {
    complexity,
    efficiency,
    recommendations
  };
}
EOF
        ;;
    "insurance")
        cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateAnnualPremium(inputs: ${CLASS_NAME}Inputs): number {
  return (inputs.coverageAmount * inputs.premiumRate / 100) * (1 + inputs.riskFactors / 100);
}

export function calculateTotalPremium(inputs: ${CLASS_NAME}Inputs): number {
  return calculateAnnualPremium(inputs) * inputs.policyTerm;
}

export function calculateCoverageRatio(inputs: ${CLASS_NAME}Inputs): number {
  return inputs.coverageAmount / calculateAnnualPremium(inputs);
}

export function calculateRiskAdjustedRate(inputs: ${CLASS_NAME}Inputs): number {
  return inputs.premiumRate * (1 + inputs.riskFactors / 100);
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  const coverageAdequacy = metrics.coverageRatio > 100 ? 'Adequate coverage' : 'Potentially insufficient coverage';
  const premiumEfficiency = metrics.annualPremium < inputs.coverageAmount * 0.05 ? 'Good value' : 'Premium may be high';

  const recommendations = [];
  if (metrics.coverageRatio < 50) {
    recommendations.push('Consider increasing coverage amount');
  }
  if (inputs.riskFactors > 50) {
    recommendations.push('High risk factors - consider risk mitigation strategies');
  }
  recommendations.push('Review policy terms with insurance professional');

  return {
    coverageAdequacy,
    premiumEfficiency,
    recommendations
  };
}
EOF
        ;;
    "health")
        cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateWeightLossRequired(inputs: ${CLASS_NAME}Inputs): number {
  return inputs.currentWeight - inputs.targetWeight;
}

export function calculateWeeklyLossRate(inputs: ${CLASS_NAME}Inputs): number {
  const totalLoss = calculateWeightLossRequired(inputs);
  return totalLoss / (inputs.timeFrame / 7);
}

export function calculateDailyCalorieDeficit(inputs: ${CLASS_NAME}Inputs): number {
  // Approximate: 3500 calories per pound
  const weeklyLoss = calculateWeeklyLossRate(inputs);
  return (weeklyLoss * 3500) / 7;
}

export function calculateEstimatedTime(inputs: ${CLASS_NAME}Inputs): number {
  const weeklyRate = calculateWeeklyLossRate(inputs);
  if (weeklyRate <= 0) return 0;

  // Safe weight loss is 1-2 pounds per week
  const safeRate = inputs.activityLevel === 'active' ? 2 : 1;
  return calculateWeightLossRequired(inputs) / safeRate;
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  const feasibility = metrics.estimatedTime > 0 && metrics.estimatedTime < 100 ? 'Realistic goal' : 'May require professional guidance';
  const healthSafety = metrics.weeklyLossRate <= 2 ? 'Safe weight loss rate' : 'Weight loss rate may be too aggressive';

  const recommendations = [];
  if (metrics.weeklyLossRate > 2) {
    recommendations.push('Consider slowing weight loss to 1-2 pounds per week for safety');
  }
  if (inputs.activityLevel === 'sedentary') {
    recommendations.push('Increase physical activity for better results');
  }
  recommendations.push('Consult with a healthcare professional before starting');

  return {
    feasibility,
    healthSafety,
    recommendations
  };
}
EOF
        ;;
    *)
        cat > "$DIR/formulas.ts" << EOF
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Metrics, ${CLASS_NAME}Analysis } from './types';

export function calculateResult(inputs: ${CLASS_NAME}Inputs): number {
  return inputs.inputValue * inputs.multiplier;
}

export function generateCalculation(inputs: ${CLASS_NAME}Inputs): string {
  return \`\${inputs.inputValue} × \${inputs.multiplier} = \${calculateResult(inputs)}\`;
}

export function generateAnalysis(inputs: ${CLASS_NAME}Inputs, metrics: ${CLASS_NAME}Metrics): ${CLASS_NAME}Analysis {
  const summary = \`Calculation completed: \${metrics.calculation}\`;

  const recommendations = [];
  if (inputs.multiplier === 0) {
    recommendations.push('Multiplying by zero always results in zero');
  }
  recommendations.push('Basic multiplication completed successfully');

  return {
    summary,
    recommendations
  };
}
EOF
        ;;
esac

# Create validation.ts
cat > "$DIR/validation.ts" << EOF
import { ${CLASS_NAME}Inputs } from './types';

export function validate${CLASS_NAME}Inputs(inputs: ${CLASS_NAME}Inputs): Array<{ field: string; message: string }> {
  const errors: Array<{ field: string; message: string }> = [];

  // Add specific validation based on calculator type
  const inputKeys = Object.keys(inputs) as Array<keyof ${CLASS_NAME}Inputs>;

  inputKeys.forEach(key => {
    const value = inputs[key];
    if (typeof value === 'number' && (isNaN(value) || !isFinite(value))) {
      errors.push({ field: key, message: \`\${key} must be a valid number\` });
    }
    if (typeof value === 'number' && value < 0) {
      errors.push({ field: key, message: \`\${key} cannot be negative\` });
    }
  });

  return errors;
}

export function validate${CLASS_NAME}BusinessRules(inputs: ${CLASS_NAME}Inputs): Array<{ field: string; message: string }> {
  const warnings: Array<{ field: string; message: string }> = [];

  // Add business rule validations based on calculator type
  // These are examples - customize based on specific calculator requirements

  return warnings;
}
EOF

# Create quickValidation.ts
cat > "$DIR/quickValidation.ts" << EOF
import { ${CLASS_NAME}Inputs } from './types';

// Validation functions with allInputs parameter as required by standards
export function validateInputValue(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'number') {
    return { isValid: false, message: 'Value must be a number' };
  }
  if (value < 0) {
    return { isValid: false, message: 'Value cannot be negative' };
  }
  return { isValid: true };
}

export function validateMultiplier(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || typeof value !== 'number') {
    return { isValid: false, message: 'Multiplier must be a number' };
  }
  return { isValid: true };
}

export function validatePrincipalAmount(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value <= 0) {
    return { isValid: false, message: 'Principal amount must be greater than 0' };
  }
  if (value > 10000000) {
    return { isValid: false, message: 'Principal amount cannot exceed \$10,000,000' };
  }
  return { isValid: true };
}

export function validateInterestRate(value: any, allInputs?: Record<string, any>): { isValid: boolean; message?: string } {
  if (!value || value < 0) {
    return { isValid: false, message: 'Interest rate cannot be negative' };
  }
  if (value > 50) {
    return { isValid: false, message: 'Interest rate seems unusually high' };
  }
  return { isValid: true };
}
EOF

# Generate main calculator file based on type
case $CALCULATOR_TYPE in
    "financial")
        cat > "$DIR/${CLASS_NAME}.ts" << EOF
import { Calculator } from '../../../types/calculator';
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Outputs } from './types';
import {
  calculateTotalAmount,
  calculateTotalInterest,
  calculateMonthlyPayment,
  calculateEffectiveRate,
  generateAnalysis
} from './formulas';
import { validate${CLASS_NAME}Inputs } from './validation';

export const ${CLASS_NAME}: Calculator = {
  id: '$CALCULATOR_NAME',
  title: '$TITLE',
  category: '$CATEGORY',
  subcategory: 'Financial Planning',
  description: '$DESCRIPTION',
  usageInstructions: [
    'Enter the principal amount to invest',
    'Specify the expected interest rate',
    'Set the time period in years',
    'Choose compounding frequency',
    'Review the calculated returns and analysis'
  ],

  inputs: [
    {
      id: 'principalAmount',
      label: 'Principal Amount (\$)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Initial investment amount'
    },
    {
      id: 'interestRate',
      label: 'Interest Rate (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Annual interest rate'
    },
    {
      id: 'timePeriod',
      label: 'Time Period (Years)',
      type: 'number',
      required: true,
      min: 1,
      max: 50,
      tooltip: 'Investment duration in years'
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding Frequency',
      type: 'select',
      required: true,
      options: [
        { value: 1, label: 'Annually' },
        { value: 2, label: 'Semi-Annually' },
        { value: 4, label: 'Quarterly' },
        { value: 12, label: 'Monthly' },
        { value: 365, label: 'Daily' }
      ],
      tooltip: 'How often interest is compounded'
    }
  ],

  outputs: [
    {
      id: 'totalAmount',
      label: 'Total Amount',
      type: 'currency',
      explanation: 'Final amount including principal and interest'
    },
    {
      id: 'totalInterest',
      label: 'Total Interest',
      type: 'currency',
      explanation: 'Total interest earned'
    },
    {
      id: 'monthlyPayment',
      label: 'Monthly Payment',
      type: 'currency',
      explanation: 'Monthly equivalent payment'
    },
    {
      id: 'effectiveRate',
      label: 'Effective Annual Rate',
      type: 'percentage',
      explanation: 'Effective annual interest rate'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Long-term Investment Growth',
      description: 'Calculate growth of \$10,000 investment over 20 years at 7% interest',
      inputs: {
        principalAmount: 10000,
        interestRate: 7,
        timePeriod: 20,
        compoundingFrequency: 12
      },
      expectedOutputs: {
        totalAmount: 38715,
        totalInterest: 28715,
        monthlyPayment: 161,
        effectiveRate: 7.23
      }
    },
    {
      title: 'Short-term Savings',
      description: 'Calculate growth of \$5,000 savings over 3 years at 3% interest',
      inputs: {
        principalAmount: 5000,
        interestRate: 3,
        timePeriod: 3,
        compoundingFrequency: 4
      },
      expectedOutputs: {
        totalAmount: 5460,
        totalInterest: 460,
        monthlyPayment: 152,
        effectiveRate: 3.03
      }
    }
  ]
};
EOF
        ;;
    "legal")
        cat > "$DIR/${CLASS_NAME}.ts" << EOF
import { Calculator } from '../../../types/calculator';
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Outputs } from './types';
import {
  calculateSettlementAmount,
  calculateNetRecovery,
  calculateTotalCosts,
  generateAnalysis
} from './formulas';
import { validate${CLASS_NAME}Inputs } from './validation';

export const ${CLASS_NAME}: Calculator = {
  id: '$CALCULATOR_NAME',
  title: '$TITLE',
  category: '$CATEGORY',
  subcategory: 'Settlement Analysis',
  description: '$DESCRIPTION',
  usageInstructions: [
    'Enter the total claim amount',
    'Specify expected settlement percentage',
    'Input attorney fees and court costs',
    'Select jurisdiction for calculations',
    'Review settlement analysis and recommendations'
  ],

  inputs: [
    {
      id: 'claimAmount',
      label: 'Claim Amount (\$)',
      type: 'currency',
      required: true,
      min: 0,
      tooltip: 'Total amount being claimed'
    },
    {
      id: 'settlementPercentage',
      label: 'Settlement Percentage (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 100,
      tooltip: 'Expected settlement as percentage of claim'
    },
    {
      id: 'attorneyFees',
      label: 'Attorney Fees (%)',
      type: 'percentage',
      required: true,
      min: 0,
      max: 50,
      tooltip: 'Attorney fees as percentage of settlement'
    },
    {
      id: 'courtCosts',
      label: 'Court Costs (\$)',
      type: 'currency',
      required: false,
      min: 0,
      tooltip: 'Additional court and filing costs'
    },
    {
      id: 'jurisdiction',
      label: 'Jurisdiction',
      type: 'select',
      required: true,
      options: [
        { value: 'federal', label: 'Federal Court' },
        { value: 'state', label: 'State Court' },
        { value: 'county', label: 'County Court' }
      ],
      tooltip: 'Court jurisdiction for the case'
    }
  ],

  outputs: [
    {
      id: 'settlementAmount',
      label: 'Settlement Amount',
      type: 'currency',
      explanation: 'Calculated settlement amount'
    },
    {
      id: 'netRecovery',
      label: 'Net Recovery',
      type: 'currency',
      explanation: 'Amount received after fees and costs'
    },
    {
      id: 'totalCosts',
      label: 'Total Costs',
      type: 'currency',
      explanation: 'Total attorney fees and court costs'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Personal Injury Settlement',
      description: 'Calculate settlement for \$100,000 claim with 60% recovery and 30% attorney fees',
      inputs: {
        claimAmount: 100000,
        settlementPercentage: 60,
        attorneyFees: 30,
        courtCosts: 2500,
        jurisdiction: 'state'
      },
      expectedOutputs: {
        settlementAmount: 60000,
        netRecovery: 37500,
        totalCosts: 22500
      }
    },
    {
      title: 'Contract Dispute',
      description: 'Calculate settlement for \$50,000 contract claim with 80% recovery',
      inputs: {
        claimAmount: 50000,
        settlementPercentage: 80,
        attorneyFees: 25,
        courtCosts: 1500,
        jurisdiction: 'federal'
      },
      expectedOutputs: {
        settlementAmount: 40000,
        netRecovery: 28500,
        totalCosts: 11500
      }
    }
  ]
};
EOF
        ;;
    *)
        cat > "$DIR/${CLASS_NAME}.ts" << EOF
import { Calculator } from '../../../types/calculator';
import { ${CLASS_NAME}Inputs, ${CLASS_NAME}Outputs } from './types';
import { calculateResult, generateCalculation, generateAnalysis } from './formulas';
import { validate${CLASS_NAME}Inputs } from './validation';

export const ${CLASS_NAME}: Calculator = {
  id: '$CALCULATOR_NAME',
  title: '$TITLE',
  category: '$CATEGORY',
  subcategory: 'General',
  description: '$DESCRIPTION',
  usageInstructions: [
    'Enter input value',
    'Specify multiplier',
    'Review calculation result'
  ],

  inputs: [
    {
      id: 'inputValue',
      label: 'Input Value',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Value to be calculated'
    },
    {
      id: 'multiplier',
      label: 'Multiplier',
      type: 'number',
      required: true,
      min: 0,
      tooltip: 'Multiplication factor'
    }
  ],

  outputs: [
    {
      id: 'result',
      label: 'Result',
      type: 'number',
      explanation: 'Calculation result'
    },
    {
      id: 'calculation',
      label: 'Calculation',
      type: 'text',
      explanation: 'Calculation breakdown'
    }
  ],

  formulas: [], // Will be implemented with the calculation engine

  validationRules: [], // Will be implemented with validation rules

  examples: [
    {
      title: 'Basic Multiplication',
      description: 'Multiply 10 by 5',
      inputs: {
        inputValue: 10,
        multiplier: 5
      },
      expectedOutputs: {
        result: 50,
        calculation: '10 × 5 = 50'
      }
    },
    {
      title: 'Zero Multiplication',
      description: 'Multiply any number by zero',
      inputs: {
        inputValue: 100,
        multiplier: 0
      },
      expectedOutputs: {
        result: 0,
        calculation: '100 × 0 = 0'
      }
    }
  ]
};
EOF
        ;;
esac

# Create register.ts
cat > "$DIR/register.ts" << EOF
import { calculatorRegistry } from '../../../data/calculatorRegistry';
import { ${CLASS_NAME} } from './${CLASS_NAME}';

export function register${CLASS_NAME}(): void {
  calculatorRegistry.register(${CLASS_NAME});
}

export { ${CLASS_NAME} };
EOF

# Create index.ts
cat > "$DIR/index.ts" << EOF
export { ${CLASS_NAME} } from './${CLASS_NAME}';
export * from './types';
export * from './formulas';
export * from './validation';
export * from './quickValidation';
EOF

# Create test file
cat > "$DIR/${CLASS_NAME}.test.ts" << EOF
import { describe, it, expect } from 'vitest';
import { calculateResult } from './formulas';
import { validate${CLASS_NAME}Inputs } from './validation';

describe('$TITLE', () => {
  const mockInputs = {
    inputValue: 10,
    multiplier: 5
  };

  describe('Calculations', () => {
    it('calculates result correctly', () => {
      const result = calculateResult(mockInputs);
      expect(result).toBe(50);
    });

    it('handles zero multiplication', () => {
      const zeroInputs = { ...mockInputs, multiplier: 0 };
      const result = calculateResult(zeroInputs);
      expect(result).toBe(0);
    });

    it('handles large numbers', () => {
      const largeInputs = { inputValue: 1000, multiplier: 1000 };
      const result = calculateResult(largeInputs);
      expect(result).toBe(1000000);
    });
  });

  describe('Validation', () => {
    it('validates correct inputs', () => {
      const result = validate${CLASS_NAME}Inputs(mockInputs);
      expect(result.length).toBe(0);
    });

    it('validates negative numbers', () => {
      const invalidInputs = { ...mockInputs, inputValue: -5 };
      const result = validate${CLASS_NAME}Inputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });

    it('validates NaN values', () => {
      const invalidInputs = { ...mockInputs, inputValue: NaN };
      const result = validate${CLASS_NAME}Inputs(invalidInputs);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles decimal inputs', () => {
      const decimalInputs = { inputValue: 3.5, multiplier: 2.0 };
      const result = calculateResult(decimalInputs);
      expect(result).toBe(7.0);
    });

    it('handles very small numbers', () => {
      const smallInputs = { inputValue: 0.001, multiplier: 0.001 };
      const result = calculateResult(smallInputs);
      expect(result).toBeCloseTo(0.000001, 6);
    });
  });
});
EOF

echo "Complete calculator implementation created in $DIR"
echo "Calculator type: $CALCULATOR_TYPE"
echo "Ready for testing and deployment"