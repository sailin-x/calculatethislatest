import { Calculator } from '../../types/calculator';
import { statisticsCalculatorFormula } from './formulas';
import { ValidationRuleFactory } from '../../utils/validation';

export const statisticsCalculator: Calculator = {
  id: 'statistics-calculator',
  title: 'Statistics Calculator',
  category: 'math',
  subcategory: 'Statistics & Probability',
  description: 'Comprehensive statistical analysis including descriptive statistics, confidence intervals, hypothesis testing, and regression analysis with step-by-step solutions.',
  
  usageInstructions: [
    'Enter your dataset as comma-separated numbers',
    'Select confidence level for interval estimation',
    'Add hypothesized mean for t-test analysis if needed',
    'Choose significance level for hypothesis testing',
    'Review complete statistical analysis and interpretations'
  ],

  inputs: [
    {
      id: 'dataset',
      label: 'Dataset (comma-separated)',
      type: 'select', // Custom component needed for array input
      required: true,
      placeholder: '12, 15, 18, 22, 25, 28, 30, 35',
      tooltip: 'Enter your data points separated by commas'
    },
    {
      id: 'confidenceLevel',
      label: 'Confidence Level (%)',
      type: 'select',
      required: true,
      options: [
        { value: '90', label: '90%' },
        { value: '95', label: '95%' },
        { value: '99', label: '99%' }
      ],
      tooltip: 'Confidence level for interval estimation',
      defaultValue: '95'
    },
    {
      id: 'hypothesizedMean',
      label: 'Hypothesized Mean - Optional',
      type: 'number',
      required: false,
      placeholder: '20',
      tooltip: 'Population mean for hypothesis testing'
    },
    {
      id: 'significanceLevel',
      label: 'Significance Level',
      type: 'select',
      required: true,
      options: [
        { value: '0.01', label: '0.01 (99% confidence)' },
        { value: '0.05', label: '0.05 (95% confidence)' },
        { value: '0.10', label: '0.10 (90% confidence)' }
      ],
      tooltip: 'Alpha level for hypothesis testing',
      defaultValue: '0.05'
    }
  ],

  outputs: [
    {
      id: 'mean',
      label: 'Mean (Average)',
      type: 'number',
      explanation: 'Arithmetic average of all data points'
    },
    {
      id: 'median',
      label: 'Median',
      type: 'number',
      explanation: 'Middle value when data is arranged in order'
    },
    {
      id: 'mode',
      label: 'Mode',
      type: 'text',
      explanation: 'Most frequently occurring value(s)'
    },
    {
      id: 'sampleStandardDeviation',
      label: 'Sample Standard Deviation',
      type: 'number',
      explanation: 'Measure of data spread (sample formula)'
    },
    {
      id: 'variance',
      label: 'Sample Variance',
      type: 'number',
      explanation: 'Square of standard deviation'
    },
    {
      id: 'range',
      label: 'Range',
      type: 'number',
      explanation: 'Difference between maximum and minimum values'
    },
    {
      id: 'interquartileRange',
      label: 'Interquartile Range (IQR)',
      type: 'number',
      explanation: 'Range of the middle 50% of data (Q3 - Q1)'
    },
    {
      id: 'lowerBound',
      label: 'Confidence Interval Lower Bound',
      type: 'number',
      explanation: 'Lower limit of confidence interval for population mean'
    },
    {
      id: 'upperBound',
      label: 'Confidence Interval Upper Bound',
      type: 'number',
      explanation: 'Upper limit of confidence interval for population mean'
    },
    {
      id: 'marginOfError',
      label: 'Margin of Error',
      type: 'number',
      explanation: 'Maximum expected difference from true population mean'
    },
    {
      id: 'tStatistic',
      label: 'T-Statistic',
      type: 'number',
      explanation: 'Test statistic for hypothesis test (if hypothesized mean provided)'
    },
    {
      id: 'pValue',
      label: 'P-Value',
      type: 'number',
      explanation: 'Probability of observing this result if null hypothesis is true'
    }
  ],

  formulas: [statisticsCalculatorFormula],
  
  validationRules: [
    ValidationRuleFactory.required('dataset', 'Dataset is required'),
    ValidationRuleFactory.required('confidenceLevel', 'Confidence level is required'),
    ValidationRuleFactory.required('significanceLevel', 'Significance level is required'),
    
    ValidationRuleFactory.businessRule(
      'dataset',
      (dataset) => {
        if (!Array.isArray(dataset)) return false;
        return dataset.length >= 2;
      },
      'Dataset must contain at least 2 data points'
    ),
    
    ValidationRuleFactory.businessRule(
      'dataset',
      (dataset) => {
        if (!Array.isArray(dataset)) return false;
        return dataset.length <= 10000;
      },
      'Dataset cannot exceed 10,000 data points'
    )
  ],

  examples: [
    {
      title: 'Student Test Scores',
      description: 'Analysis of exam scores with confidence interval',
      inputs: {
        dataset: [78, 82, 85, 88, 91, 76, 89, 93, 87, 84],
        confidenceLevel: 95,
        significanceLevel: 0.05
      },
      expectedOutputs: {
        mean: 85.3,
        median: 86.5,
        sampleStandardDeviation: 5.4,
        lowerBound: 81.4,
        upperBound: 89.2
      }
    },
    {
      title: 'Quality Control Analysis',
      description: 'Manufacturing quality control with hypothesis test',
      inputs: {
        dataset: [9.8, 10.2, 9.9, 10.1, 9.7, 10.3, 9.8, 10.0, 9.9, 10.2],
        confidenceLevel: 99,
        hypothesizedMean: 10.0,
        significanceLevel: 0.01
      },
      expectedOutputs: {
        mean: 9.99,
        tStatistic: -0.32,
        pValue: 0.75
      }
    }
  ]
};