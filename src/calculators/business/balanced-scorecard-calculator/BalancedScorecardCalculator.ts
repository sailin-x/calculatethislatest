import { Calculator } from '../../../types/calculator';
import { BalancedScorecardCalculatorInputs, BalancedScorecardCalculatorResults } from './types';
import { balancedScorecardCalculatorFormula } from './formulas';
import * as quickValidation from './quickValidation';

/**
 * Balanced Scorecard (BSC) Performance Calculator
 * Comprehensive analysis of organizational performance across four perspectives
 */
export const balancedScorecardCalculator: Calculator = {
  id: 'balanced-scorecard-calculator',
  title: 'Balanced Scorecard (BSC) Performance Calculator',
  description: 'Comprehensive analysis of organizational performance across financial, customer, internal process, and learning & growth perspectives using the Balanced Scorecard methodology.',
  category: 'Business Operations & Finance Hub',
  subcategory: 'Performance Management',
  tags: ['balanced-scorecard', 'performance-management', 'kpi-analysis', 'strategic-planning', 'business-intelligence', 'organizational-performance'],
  
  inputs: {
    financialMetrics: {
      label: 'Financial Metrics',
      type: 'object',
      required: true,
      description: 'Financial performance indicators',
      properties: {
        revenueGrowth: {
          label: 'Revenue Growth (%)',
          type: 'number',
          required: true,
          description: 'Annual revenue growth rate',
          placeholder: '12.5',
          min: -50,
          max: 200,
          step: 0.1
        },
        profitMargin: {
          label: 'Profit Margin (%)',
          type: 'number',
          required: true,
          description: 'Net profit margin percentage',
          placeholder: '15.0',
          min: -100,
          max: 100,
          step: 0.1
        },
        returnOnInvestment: {
          label: 'Return on Investment (%)',
          type: 'number',
          required: true,
          description: 'ROI percentage',
          placeholder: '12.0',
          min: -100,
          max: 100,
          step: 0.1
        },
        returnOnEquity: {
          label: 'Return on Equity (%)',
          type: 'number',
          required: true,
          description: 'ROE percentage',
          placeholder: '15.0',
          min: -100,
          max: 100,
          step: 0.1
        },
        returnOnAssets: {
          label: 'Return on Assets (%)',
          type: 'number',
          required: true,
          description: 'ROA percentage',
          placeholder: '8.0',
          min: -100,
          max: 100,
          step: 0.1
        }
      }
    },
    customerMetrics: {
      label: 'Customer Metrics',
      type: 'object',
      required: true,
      description: 'Customer satisfaction and market performance indicators',
      properties: {
        customerSatisfaction: {
          label: 'Customer Satisfaction Score',
          type: 'number',
          required: true,
          description: 'Customer satisfaction rating (0-100)',
          placeholder: '85',
          min: 0,
          max: 100,
          step: 1
        },
        customerRetention: {
          label: 'Customer Retention Rate (%)',
          type: 'number',
          required: true,
          description: 'Customer retention percentage',
          placeholder: '90',
          min: 0,
          max: 100,
          step: 0.1
        },
        netPromoterScore: {
          label: 'Net Promoter Score',
          type: 'number',
          required: true,
          description: 'NPS score (-100 to 100)',
          placeholder: '50',
          min: -100,
          max: 100,
          step: 1
        },
        marketShare: {
          label: 'Market Share (%)',
          type: 'number',
          required: true,
          description: 'Market share percentage',
          placeholder: '20',
          min: 0,
          max: 100,
          step: 0.1
        },
        customerResponseTime: {
          label: 'Customer Response Time (hours)',
          type: 'number',
          required: true,
          description: 'Average time to respond to customer inquiries',
          placeholder: '4',
          min: 0.1,
          max: 30,
          step: 0.1
        }
      }
    },
    internalProcessMetrics: {
      label: 'Internal Process Metrics',
      type: 'object',
      required: true,
      description: 'Operational efficiency and quality indicators',
      properties: {
        processEfficiency: {
          label: 'Process Efficiency (%)',
          type: 'number',
          required: true,
          description: 'Overall process efficiency rating',
          placeholder: '85',
          min: 0,
          max: 100,
          step: 1
        },
        cycleTime: {
          label: 'Cycle Time (days)',
          type: 'number',
          required: true,
          description: 'Average process cycle time',
          placeholder: '7',
          min: 0.1,
          max: 365,
          step: 0.1
        },
        defectRate: {
          label: 'Defect Rate (%)',
          type: 'number',
          required: true,
          description: 'Product/service defect rate',
          placeholder: '2',
          min: 0,
          max: 100,
          step: 0.1
        },
        onTimeDelivery: {
          label: 'On-Time Delivery (%)',
          type: 'number',
          required: true,
          description: 'On-time delivery percentage',
          placeholder: '95',
          min: 0,
          max: 100,
          step: 1
        },
        qualityScore: {
          label: 'Quality Score',
          type: 'number',
          required: true,
          description: 'Overall quality rating (0-100)',
          placeholder: '90',
          min: 0,
          max: 100,
          step: 1
        }
      }
    },
    learningGrowthMetrics: {
      label: 'Learning & Growth Metrics',
      type: 'object',
      required: true,
      description: 'Employee development and organizational learning indicators',
      properties: {
        employeeSatisfaction: {
          label: 'Employee Satisfaction Score',
          type: 'number',
          required: true,
          description: 'Employee satisfaction rating (0-100)',
          placeholder: '80',
          min: 0,
          max: 100,
          step: 1
        },
        employeeRetention: {
          label: 'Employee Retention Rate (%)',
          type: 'number',
          required: true,
          description: 'Employee retention percentage',
          placeholder: '85',
          min: 0,
          max: 100,
          step: 0.1
        },
        trainingHours: {
          label: 'Training Hours per Employee',
          type: 'number',
          required: true,
          description: 'Annual training hours per employee',
          placeholder: '40',
          min: 0,
          max: 200,
          step: 1
        },
        skillDevelopment: {
          label: 'Skill Development Score',
          type: 'number',
          required: true,
          description: 'Skill development rating (0-100)',
          placeholder: '75',
          min: 0,
          max: 100,
          step: 1
        },
        employeeEngagement: {
          label: 'Employee Engagement Score',
          type: 'number',
          required: true,
          description: 'Employee engagement rating (0-100)',
          placeholder: '80',
          min: 0,
          max: 100,
          step: 1
        }
      }
    },
    kpis: {
      label: 'Key Performance Indicators',
      type: 'object',
      required: true,
      description: 'Additional KPIs for each perspective',
      properties: {
        financial: {
          label: 'Financial KPIs',
          type: 'array',
          required: true,
          description: 'Additional financial performance indicators',
          items: {
            type: 'string',
            placeholder: 'Enter KPI name'
          },
          default: ['Cash Flow', 'Debt-to-Equity Ratio', 'Working Capital']
        },
        customer: {
          label: 'Customer KPIs',
          type: 'array',
          required: true,
          description: 'Additional customer-related indicators',
          items: {
            type: 'string',
            placeholder: 'Enter KPI name'
          },
          default: ['Customer Lifetime Value', 'Customer Acquisition Cost', 'Brand Awareness']
        },
        internalProcess: {
          label: 'Internal Process KPIs',
          type: 'array',
          required: true,
          description: 'Additional process-related indicators',
          items: {
            type: 'string',
            placeholder: 'Enter KPI name'
          },
          default: ['Inventory Turnover', 'Lead Time', 'Capacity Utilization']
        },
        learningGrowth: {
          label: 'Learning & Growth KPIs',
          type: 'array',
          required: true,
          description: 'Additional learning and growth indicators',
          items: {
            type: 'string',
            placeholder: 'Enter KPI name'
          },
          default: ['Innovation Rate', 'Knowledge Sharing', 'Leadership Development']
        }
      }
    },
    strategicObjectives: {
      label: 'Strategic Objectives',
      type: 'object',
      required: false,
      description: 'Strategic objectives for each perspective',
      properties: {
        financial: {
          label: 'Financial Objectives',
          type: 'array',
          required: false,
          description: 'Financial strategic objectives',
          items: {
            type: 'string',
            placeholder: 'Enter objective'
          },
          default: ['Increase Revenue Growth', 'Improve Profit Margins', 'Optimize Capital Structure']
        },
        customer: {
          label: 'Customer Objectives',
          type: 'array',
          required: false,
          description: 'Customer-focused strategic objectives',
          items: {
            type: 'string',
            placeholder: 'Enter objective'
          },
          default: ['Enhance Customer Experience', 'Expand Market Share', 'Improve Customer Loyalty']
        },
        internalProcess: {
          label: 'Internal Process Objectives',
          type: 'array',
          required: false,
          description: 'Process improvement objectives',
          items: {
            type: 'string',
            placeholder: 'Enter objective'
          },
          default: ['Streamline Operations', 'Improve Quality', 'Reduce Costs']
        },
        learningGrowth: {
          label: 'Learning & Growth Objectives',
          type: 'array',
          required: false,
          description: 'Organizational development objectives',
          items: {
            type: 'string',
            placeholder: 'Enter objective'
          },
          default: ['Develop Employee Skills', 'Foster Innovation', 'Build Leadership Pipeline']
        }
      }
    },
    analysisPeriod: {
      label: 'Analysis Period (months)',
      type: 'number',
      required: true,
      description: 'Time period for trend analysis',
      placeholder: '12',
      min: 1,
      max: 60,
      step: 1,
      default: 12
    },
    includeTrendAnalysis: {
      label: 'Include Trend Analysis',
      type: 'boolean',
      required: false,
      description: 'Generate historical trend analysis',
      default: true
    },
    includeBenchmarking: {
      label: 'Include Benchmarking',
      type: 'boolean',
      required: false,
      description: 'Compare against industry benchmarks',
      default: true
    },
    includePredictiveAnalysis: {
      label: 'Include Predictive Analysis',
      type: 'boolean',
      required: false,
      description: 'Generate future performance projections',
      default: false
    },
    includeRiskAssessment: {
      label: 'Include Risk Assessment',
      type: 'boolean',
      required: false,
      description: 'Analyze performance risks and opportunities',
      default: true
    },
    monteCarloSamples: {
      label: 'Monte Carlo Samples',
      type: 'number',
      required: false,
      description: 'Number of Monte Carlo simulation samples',
      placeholder: '10000',
      min: 1000,
      max: 100000,
      step: 1000,
      default: 10000
    },
    confidenceLevel: {
      label: 'Confidence Level',
      type: 'number',
      required: false,
      description: 'Confidence level for statistical analysis',
      placeholder: '0.95',
      min: 0.8,
      max: 0.99,
      step: 0.01,
      default: 0.95
    },
    benchmarkingData: {
      label: 'Benchmarking Data',
      type: 'object',
      required: false,
      description: 'Industry and competitor benchmarking data',
      properties: {
        industryData: {
          label: 'Industry Data',
          type: 'object',
          required: false,
          properties: {
            average: {
              label: 'Industry Average Score',
              type: 'number',
              required: false,
              description: 'Industry average performance score',
              placeholder: '75',
              min: 0,
              max: 100
            }
          }
        },
        competitorData: {
          label: 'Competitor Data',
          type: 'array',
          required: false,
          description: 'Competitor performance data',
          items: {
            type: 'object',
            properties: {
              name: {
                label: 'Competitor Name',
                type: 'string',
                required: true,
                placeholder: 'Competitor A'
              },
              score: {
                label: 'Performance Score',
                type: 'number',
                required: true,
                description: 'Competitor performance score',
                placeholder: '82',
                min: 0,
                max: 100
              }
            }
          }
        }
      }
    }
  },

  outputs: {
    perspectiveScores: {
      label: 'Perspective Scores',
      type: 'object',
      description: 'Performance scores for each perspective'
    },
    overallScore: {
      label: 'Overall Score',
      type: 'object',
      description: 'Weighted overall performance score'
    },
    kpiAnalysis: {
      label: 'KPI Analysis',
      type: 'object',
      description: 'Analysis of top performers and improvement areas'
    },
    trendAnalysis: {
      label: 'Trend Analysis',
      type: 'object',
      description: 'Historical trends and projections'
    },
    benchmarkingAnalysis: {
      label: 'Benchmarking Analysis',
      type: 'object',
      description: 'Industry and competitor comparisons'
    },
    strategicInsights: {
      label: 'Strategic Insights',
      type: 'object',
      description: 'SWOT analysis and strategic insights'
    },
    recommendations: {
      label: 'Recommendations',
      type: 'object',
      description: 'Actionable recommendations and initiatives'
    },
    summary: {
      label: 'Performance Summary',
      type: 'object',
      description: 'Key metrics and insights summary'
    },
    monteCarloResults: {
      label: 'Monte Carlo Results',
      type: 'object',
      description: 'Statistical analysis results'
    }
  },

  calculate: balancedScorecardCalculatorFormula.calculate,

  validate: (inputs: Record<string, any>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Validate financial metrics
    const financialValidation = quickValidation.validateFinancialMetrics(inputs.financialMetrics, inputs);
    if (!financialValidation.isValid) {
      errors.push(`Financial Metrics: ${financialValidation.error}`);
    }

    // Validate customer metrics
    const customerValidation = quickValidation.validateCustomerMetrics(inputs.customerMetrics, inputs);
    if (!customerValidation.isValid) {
      errors.push(`Customer Metrics: ${customerValidation.error}`);
    }

    // Validate internal process metrics
    const processValidation = quickValidation.validateInternalProcessMetrics(inputs.internalProcessMetrics, inputs);
    if (!processValidation.isValid) {
      errors.push(`Internal Process Metrics: ${processValidation.error}`);
    }

    // Validate learning & growth metrics
    const learningValidation = quickValidation.validateLearningGrowthMetrics(inputs.learningGrowthMetrics, inputs);
    if (!learningValidation.isValid) {
      errors.push(`Learning & Growth Metrics: ${learningValidation.error}`);
    }

    // Validate KPIs
    const kpiValidation = quickValidation.validateKPIs(inputs.kpis, inputs);
    if (!kpiValidation.isValid) {
      errors.push(`KPIs: ${kpiValidation.error}`);
    }

    // Validate analysis period
    const periodValidation = quickValidation.validateAnalysisPeriod(inputs.analysisPeriod, inputs);
    if (!periodValidation.isValid) {
      errors.push(`Analysis Period: ${periodValidation.error}`);
    }

    // Validate Monte Carlo samples
    if (inputs.monteCarloSamples) {
      const monteCarloValidation = quickValidation.validateMonteCarloSamples(inputs.monteCarloSamples, inputs);
      if (!monteCarloValidation.isValid) {
        errors.push(`Monte Carlo Samples: ${monteCarloValidation.error}`);
      }
    }

    // Validate confidence level
    if (inputs.confidenceLevel) {
      const confidenceValidation = quickValidation.validateConfidenceLevel(inputs.confidenceLevel, inputs);
      if (!confidenceValidation.isValid) {
        errors.push(`Confidence Level: ${confidenceValidation.error}`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  examples: [
    {
      name: 'High-Performing Technology Company',
      inputs: {
        financialMetrics: {
          revenueGrowth: 25,
          profitMargin: 18,
          returnOnInvestment: 15,
          returnOnEquity: 20,
          returnOnAssets: 12
        },
        customerMetrics: {
          customerSatisfaction: 92,
          customerRetention: 95,
          netPromoterScore: 65,
          marketShare: 35,
          customerResponseTime: 2
        },
        internalProcessMetrics: {
          processEfficiency: 88,
          cycleTime: 5,
          defectRate: 1.5,
          onTimeDelivery: 98,
          qualityScore: 94
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 85,
          employeeRetention: 90,
          trainingHours: 50,
          skillDevelopment: 80,
          employeeEngagement: 88
        },
        kpis: {
          financial: ['Cash Flow', 'Debt-to-Equity Ratio', 'Working Capital'],
          customer: ['Customer Lifetime Value', 'Customer Acquisition Cost', 'Brand Awareness'],
          internalProcess: ['Inventory Turnover', 'Lead Time', 'Capacity Utilization'],
          learningGrowth: ['Innovation Rate', 'Knowledge Sharing', 'Leadership Development']
        },
        analysisPeriod: 12,
        includeTrendAnalysis: true,
        includeBenchmarking: true,
        includeRiskAssessment: true,
        monteCarloSamples: 10000,
        confidenceLevel: 0.95
      },
      description: 'Analysis of a high-performing technology company with strong financials and customer satisfaction'
    },
    {
      name: 'Manufacturing Company Seeking Improvement',
      inputs: {
        financialMetrics: {
          revenueGrowth: 8,
          profitMargin: 12,
          returnOnInvestment: 10,
          returnOnEquity: 14,
          returnOnAssets: 8
        },
        customerMetrics: {
          customerSatisfaction: 75,
          customerRetention: 82,
          netPromoterScore: 35,
          marketShare: 15,
          customerResponseTime: 8
        },
        internalProcessMetrics: {
          processEfficiency: 70,
          cycleTime: 12,
          defectRate: 5,
          onTimeDelivery: 85,
          qualityScore: 78
        },
        learningGrowthMetrics: {
          employeeSatisfaction: 72,
          employeeRetention: 78,
          trainingHours: 25,
          skillDevelopment: 65,
          employeeEngagement: 70
        },
        kpis: {
          financial: ['Cash Flow', 'Debt-to-Equity Ratio', 'Working Capital'],
          customer: ['Customer Lifetime Value', 'Customer Acquisition Cost', 'Brand Awareness'],
          internalProcess: ['Inventory Turnover', 'Lead Time', 'Capacity Utilization'],
          learningGrowth: ['Innovation Rate', 'Knowledge Sharing', 'Leadership Development']
        },
        analysisPeriod: 12,
        includeTrendAnalysis: true,
        includeBenchmarking: true,
        includeRiskAssessment: true,
        monteCarloSamples: 10000,
        confidenceLevel: 0.95
      },
      description: 'Analysis of a manufacturing company with opportunities for improvement in customer service and process efficiency'
    }
  ],

  usageInstructions: `
    <h3>How to Use the Balanced Scorecard Calculator</h3>
    
    <h4>1. Enter Financial Metrics</h4>
    <ul>
      <li><strong>Revenue Growth:</strong> Annual percentage growth in revenue</li>
      <li><strong>Profit Margin:</strong> Net profit as a percentage of revenue</li>
      <li><strong>Return on Investment:</strong> ROI percentage on capital investments</li>
      <li><strong>Return on Equity:</strong> Net income as a percentage of shareholder equity</li>
      <li><strong>Return on Assets:</strong> Net income as a percentage of total assets</li>
    </ul>
    
    <h4>2. Enter Customer Metrics</h4>
    <ul>
      <li><strong>Customer Satisfaction:</strong> Customer satisfaction score (0-100)</li>
      <li><strong>Customer Retention:</strong> Percentage of customers retained annually</li>
      <li><strong>Net Promoter Score:</strong> NPS score (-100 to 100)</li>
      <li><strong>Market Share:</strong> Percentage of total market captured</li>
      <li><strong>Customer Response Time:</strong> Average hours to respond to inquiries</li>
    </ul>
    
    <h4>3. Enter Internal Process Metrics</h4>
    <ul>
      <li><strong>Process Efficiency:</strong> Overall efficiency rating (0-100)</li>
      <li><strong>Cycle Time:</strong> Average process completion time in days</li>
      <li><strong>Defect Rate:</strong> Percentage of defective products/services</li>
      <li><strong>On-Time Delivery:</strong> Percentage of deliveries on time</li>
      <li><strong>Quality Score:</strong> Overall quality rating (0-100)</li>
    </ul>
    
    <h4>4. Enter Learning & Growth Metrics</h4>
    <ul>
      <li><strong>Employee Satisfaction:</strong> Employee satisfaction score (0-100)</li>
      <li><strong>Employee Retention:</strong> Percentage of employees retained annually</li>
      <li><strong>Training Hours:</strong> Annual training hours per employee</li>
      <li><strong>Skill Development:</strong> Skill development rating (0-100)</li>
      <li><strong>Employee Engagement:</strong> Employee engagement score (0-100)</li>
    </ul>
    
    <h4>5. Configure Analysis Options</h4>
    <ul>
      <li><strong>Analysis Period:</strong> Time period for trend analysis (1-60 months)</li>
      <li><strong>Include Trend Analysis:</strong> Generate historical trends and projections</li>
      <li><strong>Include Benchmarking:</strong> Compare against industry standards</li>
      <li><strong>Include Risk Assessment:</strong> Analyze risks and opportunities</li>
      <li><strong>Monte Carlo Samples:</strong> Number of simulation samples for statistical analysis</li>
    </ul>
  `,

  tips: [
    'Use realistic and current data for accurate analysis',
    'Include both leading and lagging indicators for comprehensive assessment',
    'Regularly update metrics to track performance trends over time',
    'Focus on actionable KPIs that align with strategic objectives',
    'Consider industry benchmarks for meaningful comparisons',
    'Use the trend analysis to identify performance patterns',
    'Leverage the recommendations to prioritize improvement initiatives',
    'Monitor the overall score to track organizational health',
    'Share results with stakeholders to drive accountability',
    'Use the Monte Carlo analysis to understand performance variability'
  ],

  relatedCalculators: [
    'kpi-dashboard-calculator',
    'performance-metrics-calculator',
    'business-intelligence-calculator',
    'strategic-planning-calculator',
    'organizational-effectiveness-calculator',
    'employee-performance-calculator',
    'customer-satisfaction-calculator',
    'process-efficiency-calculator',
    'quality-management-calculator',
    'business-analytics-calculator'
  ]
};
