import { Calculator, CalculatorInput, CalculatorOutput } from '../../../types/Calculator';

export const Exchange1031Calculator: Calculator = {
  id: '1031-exchange',
  name: '1031 Exchange Calculator',
  description: 'Calculate tax deferral benefits and requirements for like-kind property exchanges under IRC Section 1031',
  category: 'finance',
  tags: ['real estate', 'tax', 'investment', 'exchange'],
  
  inputs: [
    {
      id: 'originalPropertyValue',
      label: 'Original Property Value',
      type: 'currency',
      required: true,
      min: 0,
      placeholder: '500000',
      description: 'Current market value of the property being sold'
    },
    {
      id: 'originalBasis',
      label: 'Original Property Basis',
      type: 'currency',
      required: true,
      min: 0,
      placeholder: '300000',
      description: 'Adjusted basis in the original property (purchase price + improvements - depreciation)'
    },
    {
      id: 'replacementPropertyValue',
      label: 'Replacement Property Value',
      type: 'currency',
      required: true,
      min: 0,
      placeholder: '600000',
      description: 'Purchase price of the replacement property'
    },
    {
      id: 'exchangeExpenses',
      label: 'Exchange Expenses',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: '15000',
      placeholder: '15000',
      description: 'Total costs for the exchange (intermediary fees, legal, etc.)'
    },
    {
      id: 'capitalGainsTaxRate',
      label: 'Capital Gains Tax Rate (%)',
      type: 'percentage',
      required: false,
      min: 0,
      max: 50,
      defaultValue: '20',
      placeholder: '20',
      description: 'Combined federal and state capital gains tax rate'
    },
    {
      id: 'depreciationRecapture',
      label: 'Depreciation Recapture Amount',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: '0',
      placeholder: '50000',
      description: 'Amount of depreciation to be recaptured (taxed at 25%)'
    },
    {
      id: 'bootReceived',
      label: 'Boot Received',
      type: 'currency',
      required: false,
      min: 0,
      defaultValue: '0',
      placeholder: '0',
      description: 'Cash or non-like-kind property received in the exchange'
    }
  ],

  outputs: [
    {
      id: 'capitalGain',
      label: 'Capital Gain',
      type: 'currency',
      description: 'Total capital gain from the sale'
    },
    {
      id: 'deferredTax',
      label: 'Tax Deferred',
      type: 'currency',
      description: 'Amount of tax deferred through the 1031 exchange'
    },
    {
      id: 'taxOnBoot',
      label: 'Tax on Boot',
      type: 'currency',
      description: 'Tax owed on any boot received'
    },
    {
      id: 'newBasis',
      label: 'New Property Basis',
      type: 'currency',
      description: 'Adjusted basis in the replacement property'
    },
    {
      id: 'netCashFlow',
      label: 'Net Cash Flow Impact',
      type: 'currency',
      description: 'Net cash impact of the exchange'
    },
    {
      id: 'exchangeQualifies',
      label: 'Exchange Qualifies',
      type: 'text',
      description: 'Whether the exchange meets 1031 requirements'
    },
    {
      id: 'recommendations',
      label: 'Recommendations',
      type: 'text',
      description: 'Key recommendations for optimizing the exchange'
    }
  ],

  calculate: (inputs) => {
    const originalValue = Number(inputs.originalPropertyValue) || 0;
    const originalBasis = Number(inputs.originalBasis) || 0;
    const replacementValue = Number(inputs.replacementPropertyValue) || 0;
    const exchangeExpenses = Number(inputs.exchangeExpenses) || 0;
    const taxRate = (Number(inputs.capitalGainsTaxRate) || 20) / 100;
    const depreciationRecapture = Number(inputs.depreciationRecapture) || 0;
    const bootReceived = Number(inputs.bootReceived) || 0;

    // Calculate capital gain
    const capitalGain = Math.max(0, originalValue - originalBasis);
    
    // Calculate taxes that would be owed without 1031 exchange
    const capitalGainsTax = (capitalGain - depreciationRecapture) * taxRate;
    const depreciationRecaptureTax = depreciationRecapture * 0.25; // 25% rate
    const totalTaxWithoutExchange = capitalGainsTax + depreciationRecaptureTax;
    
    // Calculate tax on boot (if any)
    const taxableGainOnBoot = Math.min(bootReceived, capitalGain);
    const taxOnBoot = taxableGainOnBoot * taxRate;
    
    // Calculate deferred tax
    const deferredTax = totalTaxWithoutExchange - taxOnBoot;
    
    // Calculate new basis in replacement property
    const newBasis = originalBasis + (replacementValue - originalValue) - bootReceived;
    
    // Calculate net cash flow impact
    const netCashFlow = bootReceived - exchangeExpenses - taxOnBoot;
    
    // Determine if exchange qualifies
    const qualifiesForExchange = replacementValue >= (originalValue - bootReceived) && 
                                bootReceived <= capitalGain;
    
    // Generate recommendations
    let recommendations = [];
    
    if (!qualifiesForExchange) {
      recommendations.push('Exchange may not qualify - replacement property value must be equal or greater');
    }
    
    if (bootReceived > 0) {
      recommendations.push('Consider minimizing boot to maximize tax deferral');
    }
    
    if (replacementValue < originalValue * 1.2) {
      recommendations.push('Consider higher-value replacement property to maximize leverage');
    }
    
    if (exchangeExpenses > originalValue * 0.05) {
      recommendations.push('Exchange expenses seem high - review intermediary and legal fees');
    }
    
    recommendations.push('Ensure 45-day identification and 180-day completion deadlines are met');
    recommendations.push('Use qualified intermediary to avoid constructive receipt');

    return {
      capitalGain: {
        value: capitalGain,
        formatted: `$${capitalGain.toLocaleString()}`,
        explanation: `Capital gain calculated as sale price (${originalValue.toLocaleString()}) minus adjusted basis (${originalBasis.toLocaleString()})`
      },
      deferredTax: {
        value: deferredTax,
        formatted: `$${deferredTax.toLocaleString()}`,
        explanation: `Tax deferred through 1031 exchange: $${totalTaxWithoutExchange.toLocaleString()} total tax minus $${taxOnBoot.toLocaleString()} tax on boot`
      },
      taxOnBoot: {
        value: taxOnBoot,
        formatted: `$${taxOnBoot.toLocaleString()}`,
        explanation: `Tax owed on boot received: $${bootReceived.toLocaleString()} boot × ${(taxRate * 100).toFixed(1)}% tax rate`
      },
      newBasis: {
        value: newBasis,
        formatted: `$${newBasis.toLocaleString()}`,
        explanation: `New basis: $${originalBasis.toLocaleString()} original basis + $${(replacementValue - originalValue).toLocaleString()} additional investment - $${bootReceived.toLocaleString()} boot`
      },
      netCashFlow: {
        value: netCashFlow,
        formatted: `$${netCashFlow.toLocaleString()}`,
        explanation: `Net cash impact: $${bootReceived.toLocaleString()} boot - $${exchangeExpenses.toLocaleString()} expenses - $${taxOnBoot.toLocaleString()} taxes`
      },
      exchangeQualifies: {
        value: qualifiesForExchange ? 'Yes' : 'No',
        formatted: qualifiesForExchange ? 'Yes - Exchange Qualifies' : 'No - Review Requirements',
        explanation: qualifiesForExchange 
          ? 'Exchange meets basic 1031 requirements for tax deferral'
          : 'Exchange may not qualify - ensure replacement property value equals or exceeds relinquished property value minus boot'
      },
      recommendations: {
        value: recommendations.join('; '),
        formatted: recommendations.map(r => `• ${r}`).join('\n'),
        explanation: 'Key recommendations to optimize your 1031 exchange and ensure compliance'
      }
    };
  },

  formulas: [
    {
      name: 'Capital Gain',
      formula: 'Capital Gain = Sale Price - Adjusted Basis',
      description: 'The gain realized from selling the original property'
    },
    {
      name: 'Tax Deferred',
      formula: 'Tax Deferred = (Capital Gain × Tax Rate) + (Depreciation Recapture × 25%) - Tax on Boot',
      description: 'Amount of tax deferred through the 1031 exchange'
    },
    {
      name: 'New Basis',
      formula: 'New Basis = Old Basis + Additional Investment - Boot Received',
      description: 'Adjusted basis in the replacement property for future tax calculations'
    }
  ],

  examples: [
    {
      name: 'Basic 1031 Exchange',
      description: 'Simple like-kind exchange with no boot',
      inputs: {
        originalPropertyValue: '500000',
        originalBasis: '300000',
        replacementPropertyValue: '600000',
        exchangeExpenses: '15000',
        capitalGainsTaxRate: '20',
        depreciationRecapture: '50000',
        bootReceived: '0'
      }
    },
    {
      name: 'Exchange with Boot',
      description: 'Exchange where some cash is received',
      inputs: {
        originalPropertyValue: '800000',
        originalBasis: '400000',
        replacementPropertyValue: '750000',
        exchangeExpenses: '20000',
        capitalGainsTaxRate: '23.8',
        depreciationRecapture: '100000',
        bootReceived: '50000'
      }
    }
  ]
};

export default Exchange1031Calculator;