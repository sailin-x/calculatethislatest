import { Calculator } from '../../../types/calculator';

export const hoaFeeCalculator: Calculator = {
  id: 'hoa-fee',
  title: 'HOA Fee Calculator',
  category: 'finance',
  subcategory: 'Real Estate & Property Management',
  description: 'Calculate HOA fees, costs, and financial health for homeowners associations',
  
  usageInstructions: [
    'Enter property information including type, size, and unit details',
    'Input HOA information including association type and total units',
    'Set monthly fees, special assessments, and reserve fund details',
    'Provide operating expenses and amenity costs',
    'Review comprehensive HOA cost analysis with financial health assessment'
  ],

  inputs: [
    {
      id: 'propertyType',
      label: 'Property Type',
      type: 'select',
      required: true,
      options: [
        { value: 'condo', label: 'Condo' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'single-family', label: 'Single Family' },
        { value: 'co-op', label: 'Co-op' },
        { value: 'pud', label: 'PUD' }
      ],
      tooltip: 'Type of property',
      defaultValue: 'condo'
    },
    {
      id: 'propertySize',
      label: 'Property Size (sq ft)',
      type: 'number',
      required: true,
      placeholder: '1200',
      tooltip: 'Square footage of the property',
      defaultValue: 1200,
      min: 500,
      max: 10000
    },
    {
      id: 'hoaType',
      label: 'HOA Type',
      type: 'select',
      required: true,
      options: [
        { value: 'condo-association', label: 'Condo Association' },
        { value: 'homeowners-association', label: 'Homeowners Association' },
        { value: 'coop-board', label: 'Co-op Board' },
        { value: 'master-association', label: 'Master Association' }
      ],
      tooltip: 'Type of homeowners association',
      defaultValue: 'condo-association'
    },
    {
      id: 'totalUnits',
      label: 'Total Units',
      type: 'number',
      required: true,
      placeholder: '50',
      tooltip: 'Total number of units in the association',
      defaultValue: 50,
      min: 2,
      max: 1000
    },
    {
      id: 'totalBuildings',
      label: 'Total Buildings',
      type: 'number',
      required: true,
      placeholder: '2',
      tooltip: 'Total number of buildings',
      defaultValue: 2,
      min: 1,
      max: 100
    },
    {
      id: 'monthlyFee',
      label: 'Monthly HOA Fee',
      type: 'currency',
      required: true,
      placeholder: '300',
      tooltip: 'Monthly HOA fee amount',
      defaultValue: 300,
      min: 50,
      max: 2000
    },
    {
      id: 'specialAssessment',
      label: 'Special Assessment',
      type: 'currency',
      required: false,
      placeholder: '0',
      tooltip: 'Special assessment amount (if any)',
      defaultValue: 0,
      min: 0,
      max: 50000
    },
    {
      id: 'reserveFund',
      label: 'Reserve Fund Balance',
      type: 'currency',
      required: false,
      placeholder: '50000',
      tooltip: 'Current reserve fund balance',
      defaultValue: 50000,
      min: 0,
      max: 1000000
    },
    {
      id: 'reserveFundTarget',
      label: 'Reserve Fund Target',
      type: 'currency',
      required: false,
      placeholder: '100000',
      tooltip: 'Target reserve fund balance',
      defaultValue: 100000,
      min: 0,
      max: 2000000
    },
    {
      id: 'operatingExpenses',
      label: 'Annual Operating Expenses',
      type: 'currency',
      required: false,
      placeholder: '150000',
      tooltip: 'Annual operating expenses for the association',
      defaultValue: 150000,
      min: 10000,
      max: 1000000
    },
    {
      id: 'insuranceCosts',
      label: 'Annual Insurance Costs',
      type: 'currency',
      required: false,
      placeholder: '25000',
      tooltip: 'Annual insurance costs for the association',
      defaultValue: 25000,
      min: 5000,
      max: 200000
    },
    {
      id: 'maintenanceCosts',
      label: 'Annual Maintenance Costs',
      type: 'currency',
      required: false,
      placeholder: '30000',
      tooltip: 'Annual maintenance costs for the association',
      defaultValue: 30000,
      min: 5000,
      max: 150000
    },
    {
      id: 'utilityCosts',
      label: 'Annual Utility Costs',
      type: 'currency',
      required: false,
      placeholder: '20000',
      tooltip: 'Annual utility costs for the association',
      defaultValue: 20000,
      min: 5000,
      max: 100000
    },
    {
      id: 'managementFees',
      label: 'Annual Management Fees',
      type: 'currency',
      required: false,
      placeholder: '15000',
      tooltip: 'Annual property management fees',
      defaultValue: 15000,
      min: 5000,
      max: 100000
    },
    {
      id: 'amenityCosts',
      label: 'Annual Amenity Costs',
      type: 'currency',
      required: false,
      placeholder: '10000',
      tooltip: 'Annual costs for amenities (pool, gym, etc.)',
      defaultValue: 10000,
      min: 0,
      max: 100000
    },
    {
      id: 'legalFees',
      label: 'Annual Legal Fees',
      type: 'currency',
      required: false,
      placeholder: '5000',
      tooltip: 'Annual legal and accounting fees',
      defaultValue: 5000,
      min: 0,
      max: 50000
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'percentage',
      required: false,
      placeholder: '2.5',
      tooltip: 'Expected annual inflation rate',
      defaultValue: 2.5,
      min: 0,
      max: 10
    },
    {
      id: 'feeIncreaseRate',
      label: 'Annual Fee Increase Rate',
      type: 'percentage',
      required: false,
      placeholder: '3.0',
      tooltip: 'Expected annual HOA fee increase rate',
      defaultValue: 3.0,
      min: 0,
      max: 15
    },
    {
      id: 'analysisPeriod',
      label: 'Analysis Period (years)',
      type: 'number',
      required: false,
      placeholder: '10',
      tooltip: 'Period for long-term cost analysis',
      defaultValue: 10,
      min: 1,
      max: 30
    }
  ],

  outputs: [
    {
      id: 'annualHOAFee',
      label: 'Annual HOA Fee',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total annual HOA fees'
    },
    {
      id: 'totalAnnualCost',
      label: 'Total Annual Cost',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total annual cost including fees and assessments'
    },
    {
      id: 'costPerSqFt',
      label: 'Cost per Square Foot',
      type: 'currency',
      format: '$0.00',
      explanation: 'Annual HOA cost per square foot'
    },
    {
      id: 'reserveFundHealth',
      label: 'Reserve Fund Health',
      type: 'text',
      explanation: 'Assessment of reserve fund adequacy'
    },
    {
      id: 'reserveFundPercentage',
      label: 'Reserve Fund Percentage',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Reserve fund as percentage of target'
    },
    {
      id: 'financialHealthScore',
      label: 'Financial Health Score',
      type: 'number',
      format: '0',
      explanation: 'Overall financial health score (0-100)'
    },
    {
      id: 'feeEfficiency',
      label: 'Fee Efficiency',
      type: 'percentage',
      format: '0.0%',
      explanation: 'Percentage of fees going to essential services'
    },
    {
      id: 'projectedFee10Years',
      label: 'Projected Fee (10 Years)',
      type: 'currency',
      format: '$0,0',
      explanation: 'Projected monthly fee in 10 years'
    },
    {
      id: 'totalCost10Years',
      label: 'Total Cost (10 Years)',
      type: 'currency',
      format: '$0,0',
      explanation: 'Total projected cost over 10 years'
    },
    {
      id: 'costComparison',
      label: 'Cost Comparison',
      type: 'text',
      explanation: 'Comparison with market average HOA costs'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      explanation: 'Recommendations for HOA cost optimization'
    }
  ],

  formulas: [
    {
      id: 'hoa-fee-analysis',
      name: 'HOA Fee Analysis',
      description: 'Calculate comprehensive HOA fee analysis and financial health assessment',
      calculate: (inputs: Record<string, any>) => {
        const monthlyFee = inputs.monthlyFee || 0;
        const specialAssessment = inputs.specialAssessment || 0;
        const propertySize = inputs.propertySize || 0;
        const totalUnits = inputs.totalUnits || 0;
        const reserveFund = inputs.reserveFund || 0;
        const reserveFundTarget = inputs.reserveFundTarget || 0;
        const operatingExpenses = inputs.operatingExpenses || 0;
        const insuranceCosts = inputs.insuranceCosts || 0;
        const maintenanceCosts = inputs.maintenanceCosts || 0;
        const utilityCosts = inputs.utilityCosts || 0;
        const managementFees = inputs.managementFees || 0;
        const amenityCosts = inputs.amenityCosts || 0;
        const legalFees = inputs.legalFees || 0;
        const inflationRate = (inputs.inflationRate || 2.5) / 100;
        const feeIncreaseRate = (inputs.feeIncreaseRate || 3.0) / 100;
        const analysisPeriod = inputs.analysisPeriod || 10;
        
        // Calculate annual costs
        const annualHOAFee = monthlyFee * 12;
        const totalAnnualCost = annualHOAFee + specialAssessment;
        
        // Calculate cost per square foot
        const costPerSqFt = propertySize > 0 ? totalAnnualCost / propertySize : 0;
        
        // Calculate reserve fund health
        const reserveFundPercentage = reserveFundTarget > 0 ? (reserveFund / reserveFundTarget) * 100 : 0;
        const reserveFundHealth = determineReserveFundHealth(reserveFundPercentage);
        
        // Calculate financial health score
        const financialHealthScore = calculateFinancialHealthScore(
          inputs, reserveFundPercentage, totalAnnualCost, totalUnits
        );
        
        // Calculate fee efficiency
        const essentialCosts = operatingExpenses + insuranceCosts + maintenanceCosts + utilityCosts;
        const totalCosts = essentialCosts + managementFees + amenityCosts + legalFees;
        const feeEfficiency = totalCosts > 0 ? (essentialCosts / totalCosts) * 100 : 0;
        
        // Calculate projected costs
        const projectedFee10Years = monthlyFee * Math.pow(1 + feeIncreaseRate, 10);
        const totalCost10Years = calculateTotalCostOverPeriod(monthlyFee, feeIncreaseRate, analysisPeriod);
        
        // Generate cost comparison and recommendations
        const costComparison = generateCostComparison(costPerSqFt, totalAnnualCost);
        const recommendations = generateRecommendations(
          financialHealthScore, reserveFundPercentage, feeEfficiency
        );
        
        return {
          outputs: {
            annualHOAFee: Math.round(annualHOAFee),
            totalAnnualCost: Math.round(totalAnnualCost),
            costPerSqFt: Math.round(costPerSqFt * 100) / 100,
            reserveFundHealth,
            reserveFundPercentage: Math.round(reserveFundPercentage * 100) / 100,
            financialHealthScore,
            feeEfficiency: Math.round(feeEfficiency * 100) / 100,
            projectedFee10Years: Math.round(projectedFee10Years),
            totalCost10Years: Math.round(totalCost10Years),
            costComparison,
            recommendations
          },
          explanation: `HOA fee analysis complete. Annual cost: $${totalAnnualCost.toLocaleString()}. Financial health score: ${financialHealthScore}/100. Reserve fund health: ${reserveFundHealth}.`,
          intermediateSteps: {
            essentialCosts: Math.round(essentialCosts),
            totalCosts: Math.round(totalCosts),
            monthlyFee: Math.round(monthlyFee),
            specialAssessment: Math.round(specialAssessment)
          }
        };
      }
    }
  ],

  validationRules: [
    {
      field: 'monthlyFee',
      type: 'required',
      message: 'Monthly HOA fee is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'propertySize',
      type: 'required',
      message: 'Property size is required',
      validator: (value: any) => value !== null && value !== undefined && value > 0
    },
    {
      field: 'totalUnits',
      type: 'required',
      message: 'Total units is required',
      validator: (value: any) => value !== null && value !== undefined && value > 1
    },
    {
      field: 'monthlyFee',
      type: 'range',
      message: 'Monthly HOA fee must be reasonable (between $50 and $2,000)',
      validator: (value: any) => value === null || value === undefined || (value >= 50 && value <= 2000)
    }
  ],

  examples: [
    {
      title: 'Standard Condo HOA',
      description: 'A typical condo association with standard amenities and good financial health',
      inputs: {
        propertyType: 'condo',
        propertySize: 1200,
        hoaType: 'condo-association',
        totalUnits: 50,
        totalBuildings: 2,
        monthlyFee: 300,
        specialAssessment: 0,
        reserveFund: 50000,
        reserveFundTarget: 100000,
        operatingExpenses: 150000,
        insuranceCosts: 25000,
        maintenanceCosts: 30000,
        utilityCosts: 20000,
        managementFees: 15000,
        amenityCosts: 10000,
        legalFees: 5000,
        inflationRate: 2.5,
        feeIncreaseRate: 3.0,
        analysisPeriod: 10
      },
      expectedOutputs: {
        annualHOAFee: 3600,
        totalAnnualCost: 3600,
        costPerSqFt: 3.00,
        reserveFundHealth: 'Good',
        reserveFundPercentage: 50.0,
        financialHealthScore: 75,
        feeEfficiency: 80.0,
        projectedFee10Years: 403,
        totalCost10Years: 41300,
        costComparison: 'Below market average',
        recommendations: 'Maintain current fee structure and continue building reserves'
      }
    },
    {
      title: 'Luxury Townhouse HOA',
      description: 'A high-end townhouse community with extensive amenities and premium services',
      inputs: {
        propertyType: 'townhouse',
        propertySize: 2500,
        hoaType: 'homeowners-association',
        totalUnits: 25,
        totalBuildings: 25,
        monthlyFee: 600,
        specialAssessment: 5000,
        reserveFund: 200000,
        reserveFundTarget: 300000,
        operatingExpenses: 200000,
        insuranceCosts: 40000,
        maintenanceCosts: 50000,
        utilityCosts: 30000,
        managementFees: 25000,
        amenityCosts: 50000,
        legalFees: 15000,
        inflationRate: 3.0,
        feeIncreaseRate: 4.0,
        analysisPeriod: 10
      },
      expectedOutputs: {
        annualHOAFee: 7200,
        totalAnnualCost: 12200,
        costPerSqFt: 4.88,
        reserveFundHealth: 'Excellent',
        reserveFundPercentage: 66.7,
        financialHealthScore: 85,
        feeEfficiency: 70.0,
        projectedFee10Years: 888,
        totalCost10Years: 102000,
        costComparison: 'Above market average - premium services',
        recommendations: 'Excellent financial health. Consider reducing fee increases to maintain affordability'
      }
    }
  ]
};

// Helper functions for calculations
function determineReserveFundHealth(percentage: number): string {
  if (percentage >= 80) return 'Excellent';
  else if (percentage >= 60) return 'Good';
  else if (percentage >= 40) return 'Fair';
  else if (percentage >= 20) return 'Poor';
  else return 'Critical';
}

function calculateFinancialHealthScore(
  inputs: Record<string, any>, 
  reserveFundPercentage: number, 
  totalAnnualCost: number, 
  totalUnits: number
): number {
  let score = 50; // Base score
  
  // Reserve fund health
  if (reserveFundPercentage >= 80) score += 25;
  else if (reserveFundPercentage >= 60) score += 20;
  else if (reserveFundPercentage >= 40) score += 15;
  else if (reserveFundPercentage >= 20) score += 10;
  else score -= 10;
  
  // Cost per unit analysis
  const costPerUnit = totalAnnualCost / totalUnits;
  if (costPerUnit < 5000) score += 15;
  else if (costPerUnit < 8000) score += 10;
  else if (costPerUnit < 12000) score += 5;
  else if (costPerUnit > 20000) score -= 15;
  
  // Property type considerations
  const propertyType = inputs.propertyType;
  if (propertyType === 'condo') score += 5;
  else if (propertyType === 'townhouse') score += 3;
  
  // HOA type considerations
  const hoaType = inputs.hoaType;
  if (hoaType === 'condo-association') score += 5;
  else if (hoaType === 'homeowners-association') score += 3;
  
  return Math.min(100, Math.max(0, score));
}

function calculateTotalCostOverPeriod(monthlyFee: number, increaseRate: number, years: number): number {
  let totalCost = 0;
  for (let year = 1; year <= years; year++) {
    const annualFee = monthlyFee * 12 * Math.pow(1 + increaseRate, year - 1);
    totalCost += annualFee;
  }
  return totalCost;
}

function generateCostComparison(costPerSqFt: number, totalAnnualCost: number): string {
  // Market average HOA costs (simplified)
  const marketAveragePerSqFt = 3.50;
  const marketAverageAnnual = 4000;
  
  if (costPerSqFt < marketAveragePerSqFt * 0.8 && totalAnnualCost < marketAverageAnnual * 0.8) {
    return 'Below market average - good value';
  } else if (costPerSqFt > marketAveragePerSqFt * 1.2 && totalAnnualCost > marketAverageAnnual * 1.2) {
    return 'Above market average - premium services';
  } else {
    return 'At market average';
  }
}

function generateRecommendations(
  financialHealthScore: number, 
  reserveFundPercentage: number, 
  feeEfficiency: number
): string {
  const recommendations = [];
  
  if (financialHealthScore >= 80) {
    recommendations.push('Excellent financial health - maintain current practices');
  } else if (financialHealthScore >= 60) {
    recommendations.push('Good financial health - monitor reserve fund growth');
  } else {
    recommendations.push('Improve financial health - increase reserve fund contributions');
  }
  
  if (reserveFundPercentage < 50) {
    recommendations.push('Build reserve fund to target levels');
  }
  
  if (feeEfficiency < 70) {
    recommendations.push('Review amenity costs and optimize spending');
  }
  
  return recommendations.join('. ');
}
