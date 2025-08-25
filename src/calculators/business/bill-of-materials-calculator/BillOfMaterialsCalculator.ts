import { Calculator } from '../../../types/calculator';
import { BillOfMaterialsCalculatorInputs, BillOfMaterialsCalculatorResults } from './types';
import { billOfMaterialsCalculatorFormula } from './formulas';
import * as quickValidation from './quickValidation';

/**
 * Bill of Materials (BOM) Cost Calculator
 */
export const billOfMaterialsCalculator: Calculator = {
  id: 'bill-of-materials-calculator',
  title: 'Bill of Materials (BOM) Cost Calculator',
  description: 'Comprehensive cost analysis and optimization for manufacturing bill of materials including materials, labor, overhead, and supply chain management.',
  category: 'Business Operations & Finance Hub',
  subcategory: 'Manufacturing & Supply Chain',
  tags: ['bill-of-materials', 'manufacturing', 'cost-analysis', 'supply-chain', 'inventory-management'],
  
  inputs: {
    productName: {
      label: 'Product Name',
      type: 'string',
      required: true,
      description: 'Name of the product being analyzed',
      placeholder: 'Smartphone Model X'
    },
    productDescription: {
      label: 'Product Description',
      type: 'string',
      required: true,
      description: 'Brief description of the product',
      placeholder: 'High-end smartphone with advanced features'
    },
    targetQuantity: {
      label: 'Target Production Quantity',
      type: 'number',
      required: true,
      description: 'Number of units to be produced',
      placeholder: '10000',
      min: 1,
      step: 1
    },
    assemblies: {
      label: 'BOM Assemblies',
      type: 'array',
      required: true,
      description: 'List of assemblies and their components',
      items: {
        type: 'object',
        properties: {
          name: {
            label: 'Assembly Name',
            type: 'string',
            required: true,
            placeholder: 'Main Assembly'
          },
          laborHours: {
            label: 'Labor Hours',
            type: 'number',
            required: true,
            placeholder: '2.5',
            min: 0
          },
          laborRate: {
            label: 'Labor Rate ($/hour)',
            type: 'number',
            required: true,
            placeholder: '25',
            min: 0
          },
          overheadRate: {
            label: 'Overhead Rate (%)',
            type: 'number',
            required: true,
            placeholder: '15',
            min: 0
          },
          yield: {
            label: 'Yield (%)',
            type: 'number',
            required: true,
            placeholder: '95',
            min: 1,
            max: 100
          },
          items: {
            label: 'BOM Items',
            type: 'array',
            required: true,
            items: {
              type: 'object',
              properties: {
                name: {
                  label: 'Item Name',
                  type: 'string',
                  required: true,
                  placeholder: 'Microprocessor'
                },
                quantity: {
                  label: 'Quantity per Unit',
                  type: 'number',
                  required: true,
                  placeholder: '1',
                  min: 0.001
                },
                unitCost: {
                  label: 'Unit Cost ($)',
                  type: 'number',
                  required: true,
                  placeholder: '50',
                  min: 0
                },
                supplier: {
                  label: 'Supplier ID',
                  type: 'string',
                  required: true,
                  placeholder: 'SUPP-001'
                },
                leadTime: {
                  label: 'Lead Time (days)',
                  type: 'number',
                  required: true,
                  placeholder: '30',
                  min: 0
                }
              }
            }
          }
        }
      }
    },
    suppliers: {
      label: 'Suppliers',
      type: 'array',
      required: true,
      description: 'List of suppliers and their performance metrics',
      items: {
        type: 'object',
        properties: {
          id: {
            label: 'Supplier ID',
            type: 'string',
            required: true,
            placeholder: 'SUPP-001'
          },
          name: {
            label: 'Supplier Name',
            type: 'string',
            required: true,
            placeholder: 'ABC Electronics'
          },
          reliability: {
            label: 'Reliability (%)',
            type: 'number',
            required: true,
            placeholder: '95',
            min: 0,
            max: 100
          },
          qualityRating: {
            label: 'Quality Rating (%)',
            type: 'number',
            required: true,
            placeholder: '90',
            min: 0,
            max: 100
          },
          leadTimeVariability: {
            label: 'Lead Time Variability (days)',
            type: 'number',
            required: true,
            placeholder: '2',
            min: 0
          }
        }
      }
    },
    productionVolume: {
      label: 'Annual Production Volume',
      type: 'number',
      required: true,
      description: 'Annual production volume in units',
      placeholder: '50000',
      min: 1,
      step: 1000
    },
    productionPeriod: {
      label: 'Production Period (months)',
      type: 'number',
      required: true,
      description: 'Production period for analysis',
      placeholder: '12',
      min: 1,
      max: 120,
      default: 12
    },
    laborRates: {
      label: 'Labor Rates',
      type: 'object',
      required: true,
      description: 'Hourly labor rates by function',
      properties: {
        assembly: {
          label: 'Assembly ($/hour)',
          type: 'number',
          required: true,
          placeholder: '25',
          min: 0
        },
        testing: {
          label: 'Testing ($/hour)',
          type: 'number',
          required: true,
          placeholder: '30',
          min: 0
        },
        packaging: {
          label: 'Packaging ($/hour)',
          type: 'number',
          required: true,
          placeholder: '20',
          min: 0
        },
        quality: {
          label: 'Quality Control ($/hour)',
          type: 'number',
          required: true,
          placeholder: '35',
          min: 0
        }
      }
    },
    overheadRates: {
      label: 'Overhead Rates',
      type: 'object',
      required: true,
      description: 'Overhead rates as percentage of labor',
      properties: {
        manufacturing: {
          label: 'Manufacturing (%)',
          type: 'number',
          required: true,
          placeholder: '15',
          min: 0,
          max: 100
        },
        quality: {
          label: 'Quality (%)',
          type: 'number',
          required: true,
          placeholder: '10',
          min: 0,
          max: 100
        },
        logistics: {
          label: 'Logistics (%)',
          type: 'number',
          required: true,
          placeholder: '8',
          min: 0,
          max: 100
        },
        administration: {
          label: 'Administration (%)',
          type: 'number',
          required: true,
          placeholder: '12',
          min: 0,
          max: 100
        }
      }
    },
    qualityCosts: {
      label: 'Quality Costs',
      type: 'object',
      required: true,
      description: 'Quality-related costs per unit',
      properties: {
        inspection: {
          label: 'Inspection ($/unit)',
          type: 'number',
          required: true,
          placeholder: '5',
          min: 0
        },
        testing: {
          label: 'Testing ($/unit)',
          type: 'number',
          required: true,
          placeholder: '10',
          min: 0
        },
        rework: {
          label: 'Rework ($/unit)',
          type: 'number',
          required: true,
          placeholder: '15',
          min: 0
        },
        scrap: {
          label: 'Scrap ($/unit)',
          type: 'number',
          required: true,
          placeholder: '8',
          min: 0
        }
      }
    },
    logisticsCosts: {
      label: 'Logistics Costs',
      type: 'object',
      required: true,
      description: 'Logistics costs per unit',
      properties: {
        inbound: {
          label: 'Inbound ($/unit)',
          type: 'number',
          required: true,
          placeholder: '3',
          min: 0
        },
        outbound: {
          label: 'Outbound ($/unit)',
          type: 'number',
          required: true,
          placeholder: '5',
          min: 0
        },
        warehousing: {
          label: 'Warehousing ($/unit)',
          type: 'number',
          required: true,
          placeholder: '2',
          min: 0
        },
        handling: {
          label: 'Handling ($/unit)',
          type: 'number',
          required: true,
          placeholder: '1',
          min: 0
        }
      }
    },
    currency: {
      label: 'Currency',
      type: 'select',
      required: true,
      description: 'Currency for cost calculations',
      options: [
        { value: 'USD', label: 'US Dollar (USD)' },
        { value: 'EUR', label: 'Euro (EUR)' },
        { value: 'GBP', label: 'British Pound (GBP)' },
        { value: 'CAD', label: 'Canadian Dollar (CAD)' },
        { value: 'AUD', label: 'Australian Dollar (AUD)' }
      ],
      default: 'USD'
    },
    includeInventoryAnalysis: {
      label: 'Include Inventory Analysis',
      type: 'boolean',
      required: false,
      description: 'Generate inventory management analysis',
      default: true
    },
    includeRiskAnalysis: {
      label: 'Include Risk Analysis',
      type: 'boolean',
      required: false,
      description: 'Generate supply chain risk analysis',
      default: true
    },
    includeSupplierAnalysis: {
      label: 'Include Supplier Analysis',
      type: 'boolean',
      required: false,
      description: 'Generate supplier performance analysis',
      default: true
    },
    includeCostOptimization: {
      label: 'Include Cost Optimization',
      type: 'boolean',
      required: false,
      description: 'Generate cost optimization recommendations',
      default: true
    },
    targetMargin: {
      label: 'Target Margin (%)',
      type: 'number',
      required: true,
      description: 'Target profit margin percentage',
      placeholder: '25',
      min: 0,
      max: 100,
      default: 25
    },
    inflationRate: {
      label: 'Inflation Rate (%)',
      type: 'number',
      required: false,
      description: 'Annual inflation rate for cost projections',
      placeholder: '2.5',
      min: -50,
      max: 100,
      default: 2.5
    },
    monteCarloSamples: {
      label: 'Monte Carlo Samples',
      type: 'number',
      required: false,
      description: 'Number of Monte Carlo simulation samples',
      placeholder: '10000',
      min: 1000,
      max: 100000,
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
      default: 0.95
    }
  },

  outputs: {
    productSummary: {
      label: 'Product Summary',
      type: 'object',
      description: 'Summary of product and total costs'
    },
    costAnalysis: {
      label: 'Cost Analysis',
      type: 'object',
      description: 'Detailed cost breakdown and margin analysis'
    },
    inventoryAnalysis: {
      label: 'Inventory Analysis',
      type: 'object',
      description: 'Inventory management metrics and recommendations'
    },
    riskAnalysis: {
      label: 'Risk Analysis',
      type: 'object',
      description: 'Supply chain and cost risk assessment'
    },
    supplierAnalysis: {
      label: 'Supplier Analysis',
      type: 'object',
      description: 'Supplier performance and concentration analysis'
    },
    costOptimization: {
      label: 'Cost Optimization',
      type: 'object',
      description: 'Cost reduction opportunities and recommendations'
    },
    summary: {
      label: 'Analysis Summary',
      type: 'object',
      description: 'Key insights and action items'
    },
    monteCarloResults: {
      label: 'Monte Carlo Results',
      type: 'object',
      description: 'Statistical analysis results'
    }
  },

  calculate: billOfMaterialsCalculatorFormula.calculate,

  validate: (inputs: Record<string, any>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    // Validate product information
    const productNameValidation = quickValidation.validateProductName(inputs.productName, inputs);
    if (!productNameValidation.isValid) {
      errors.push(`Product Name: ${productNameValidation.error}`);
    }

    const productDescriptionValidation = quickValidation.validateProductDescription(inputs.productDescription, inputs);
    if (!productDescriptionValidation.isValid) {
      errors.push(`Product Description: ${productDescriptionValidation.error}`);
    }

    // Validate quantities and volumes
    const targetQuantityValidation = quickValidation.validateTargetQuantity(inputs.targetQuantity, inputs);
    if (!targetQuantityValidation.isValid) {
      errors.push(`Target Quantity: ${targetQuantityValidation.error}`);
    }

    const productionVolumeValidation = quickValidation.validateProductionVolume(inputs.productionVolume, inputs);
    if (!productionVolumeValidation.isValid) {
      errors.push(`Production Volume: ${productionVolumeValidation.error}`);
    }

    const productionPeriodValidation = quickValidation.validateProductionPeriod(inputs.productionPeriod, inputs);
    if (!productionPeriodValidation.isValid) {
      errors.push(`Production Period: ${productionPeriodValidation.error}`);
    }

    // Validate assemblies and suppliers
    const assembliesValidation = quickValidation.validateAssemblies(inputs.assemblies, inputs);
    if (!assembliesValidation.isValid) {
      errors.push(`Assemblies: ${assembliesValidation.error}`);
    }

    const suppliersValidation = quickValidation.validateSuppliers(inputs.suppliers, inputs);
    if (!suppliersValidation.isValid) {
      errors.push(`Suppliers: ${suppliersValidation.error}`);
    }

    // Validate cost parameters
    const laborRatesValidation = quickValidation.validateLaborRates(inputs.laborRates, inputs);
    if (!laborRatesValidation.isValid) {
      errors.push(`Labor Rates: ${laborRatesValidation.error}`);
    }

    const overheadRatesValidation = quickValidation.validateOverheadRates(inputs.overheadRates, inputs);
    if (!overheadRatesValidation.isValid) {
      errors.push(`Overhead Rates: ${overheadRatesValidation.error}`);
    }

    const qualityCostsValidation = quickValidation.validateQualityCosts(inputs.qualityCosts, inputs);
    if (!qualityCostsValidation.isValid) {
      errors.push(`Quality Costs: ${qualityCostsValidation.error}`);
    }

    const logisticsCostsValidation = quickValidation.validateLogisticsCosts(inputs.logisticsCosts, inputs);
    if (!logisticsCostsValidation.isValid) {
      errors.push(`Logistics Costs: ${logisticsCostsValidation.error}`);
    }

    // Validate other parameters
    const currencyValidation = quickValidation.validateCurrency(inputs.currency, inputs);
    if (!currencyValidation.isValid) {
      errors.push(`Currency: ${currencyValidation.error}`);
    }

    const targetMarginValidation = quickValidation.validateTargetMargin(inputs.targetMargin, inputs);
    if (!targetMarginValidation.isValid) {
      errors.push(`Target Margin: ${targetMarginValidation.error}`);
    }

    if (inputs.inflationRate !== undefined) {
      const inflationValidation = quickValidation.validateInflationRate(inputs.inflationRate, inputs);
      if (!inflationValidation.isValid) {
        errors.push(`Inflation Rate: ${inflationValidation.error}`);
      }
    }

    if (inputs.monteCarloSamples !== undefined) {
      const monteCarloValidation = quickValidation.validateMonteCarloSamples(inputs.monteCarloSamples, inputs);
      if (!monteCarloValidation.isValid) {
        errors.push(`Monte Carlo Samples: ${monteCarloValidation.error}`);
      }
    }

    if (inputs.confidenceLevel !== undefined) {
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
      name: 'Smartphone Manufacturing BOM',
      inputs: {
        productName: 'Smartphone Model X',
        productDescription: 'High-end smartphone with advanced features',
        targetQuantity: 10000,
        assemblies: [
          {
            name: 'Main Assembly',
            laborHours: 2.5,
            laborRate: 25,
            overheadRate: 15,
            yield: 95,
            items: [
              {
                name: 'Microprocessor',
                quantity: 1,
                unitCost: 50,
                supplier: 'SUPP-001',
                leadTime: 30
              },
              {
                name: 'Display Screen',
                quantity: 1,
                unitCost: 80,
                supplier: 'SUPP-002',
                leadTime: 45
              }
            ]
          }
        ],
        suppliers: [
          {
            id: 'SUPP-001',
            name: 'ABC Electronics',
            reliability: 95,
            qualityRating: 90,
            leadTimeVariability: 2
          },
          {
            id: 'SUPP-002',
            name: 'DisplayTech Inc',
            reliability: 92,
            qualityRating: 95,
            leadTimeVariability: 1
          }
        ],
        productionVolume: 50000,
        productionPeriod: 12,
        laborRates: {
          assembly: 25,
          testing: 30,
          packaging: 20,
          quality: 35
        },
        overheadRates: {
          manufacturing: 15,
          quality: 10,
          logistics: 8,
          administration: 12
        },
        qualityCosts: {
          inspection: 5,
          testing: 10,
          rework: 15,
          scrap: 8
        },
        logisticsCosts: {
          inbound: 3,
          outbound: 5,
          warehousing: 2,
          handling: 1
        },
        currency: 'USD',
        includeInventoryAnalysis: true,
        includeRiskAnalysis: true,
        includeSupplierAnalysis: true,
        includeCostOptimization: true,
        targetMargin: 25,
        inflationRate: 2.5,
        monteCarloSamples: 10000,
        confidenceLevel: 0.95
      },
      description: 'Comprehensive BOM analysis for a high-end smartphone manufacturing project'
    }
  ],

  usageInstructions: `
    <h3>How to Use the Bill of Materials (BOM) Cost Calculator</h3>
    
    <h4>1. Product Information</h4>
    <ul>
      <li><strong>Product Name:</strong> Enter the name of the product being analyzed</li>
      <li><strong>Product Description:</strong> Provide a brief description of the product</li>
      <li><strong>Target Quantity:</strong> Specify the number of units to be produced</li>
    </ul>
    
    <h4>2. BOM Assemblies</h4>
    <ul>
      <li><strong>Assembly Structure:</strong> Define assemblies and their components</li>
      <li><strong>Labor Parameters:</strong> Enter labor hours, rates, and overhead percentages</li>
      <li><strong>Production Parameters:</strong> Specify yield and scrap rates</li>
    </ul>
    
    <h4>3. BOM Items</h4>
    <ul>
      <li><strong>Item Details:</strong> Add all components and materials</li>
      <li><strong>Cost Information:</strong> Enter unit costs, quantities, and supplier information</li>
      <li><strong>Supply Chain:</strong> Specify lead times and supplier assignments</li>
    </ul>
    
    <h4>4. Supplier Information</h4>
    <ul>
      <li><strong>Supplier Details:</strong> Enter supplier performance metrics</li>
      <li><strong>Performance Ratings:</strong> Specify reliability and quality ratings</li>
      <li><strong>Lead Time Variability:</strong> Enter standard deviation of lead times</li>
    </ul>
    
    <h4>5. Cost Parameters</h4>
    <ul>
      <li><strong>Labor Rates:</strong> Enter hourly rates for different functions</li>
      <li><strong>Overhead Rates:</strong> Specify overhead percentages by category</li>
      <li><strong>Quality Costs:</strong> Enter per-unit quality-related costs</li>
      <li><strong>Logistics Costs:</strong> Specify logistics costs per unit</li>
    </ul>
  `,

  tips: [
    'Start with a high-level assembly structure and drill down into details',
    'Use realistic supplier performance data for accurate risk assessment',
    'Include all direct and indirect costs for comprehensive analysis',
    'Consider volume discounts when calculating total material costs',
    'Use historical data to estimate yield and scrap rates accurately',
    'Include safety stock levels to account for supply chain variability',
    'Monitor cost trends and adjust analysis parameters accordingly',
    'Use the Monte Carlo simulation to understand cost variability',
    'Consider alternative suppliers for critical components',
    'Optimize inventory levels based on demand and lead time variability'
  ],

  relatedCalculators: [
    'break-even-analysis-calculator',
    'inventory-turnover-calculator',
    'supply-chain-optimization-calculator',
    'manufacturing-cost-calculator',
    'supplier-performance-calculator',
    'quality-cost-calculator',
    'logistics-cost-calculator',
    'production-planning-calculator',
    'cost-optimization-calculator',
    'risk-assessment-calculator'
  ]
};
