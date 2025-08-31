import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { BusinessValuationCalculatorInputs, BusinessValuationCalculatorOutputs } from './types';
import { calculateBusinessValuation } from './formulas';
import { validateBusinessValuationCalculatorInputs } from './validation';
import { validateField } from './quickValidation';

export default function BusinessValuationCalculator() {
  const [inputs, setInputs] = useState<BusinessValuationCalculatorInputs>({
    businessInfo: {
      basicInfo: {
        businessName: '',
        businessType: 'corporation',
        industry: '',
        sicCode: '',
        naicsCode: '',
        businessDescription: '',
        yearEstablished: new Date().getFullYear(),
        yearsInOperation: 0,
        legalStructure: '',
        taxIdentificationNumber: '',
        stateOfIncorporation: '',
        primaryLocation: '',
        secondaryLocations: [],
        businessModel: '',
        competitiveAdvantage: [],
        growthStrategy: ''
      },
      ownershipInfo: {
        owners: [],
        totalOwnership: 100,
        minorityDiscount: 0,
        controlPremium: 0,
        marketabilityDiscount: 0
      },
      managementInfo: {
        executives: [],
        employees: [],
        organizationalStructure: '',
        managementDepth: 0,
        successionPlanning: false
      },
      marketInfo: {
        marketSize: 0,
        marketGrowth: 0,
        marketShare: 0,
        competitors: [],
        customerBase: {
          totalCustomers: 0,
          repeatCustomers: 0,
          customerRetention: 0,
          averageCustomerValue: 0,
          customerConcentration: 0
        },
        geographicReach: [],
        distributionChannels: [],
        regulatoryEnvironment: '',
        barriersToEntry: []
      }
    },
    financialInfo: {
      historicalFinancials: [],
      projectedFinancials: [],
      normalizationAdjustments: {
        ownerCompensation: {
          currentCompensation: 0,
          marketCompensation: 0,
          adjustment: 0,
          reason: ''
        },
        nonRecurringItems: [],
        relatedPartyTransactions: [],
        extraordinaryItems: [],
        totalAdjustments: 0,
        normalizedEbitda: 0,
        normalizedEbit: 0,
        normalizedNetIncome: 0
      },
      workingCapitalAnalysis: {
        currentAssets: {
          cash: 0,
          accountsReceivable: 0,
          inventory: 0,
          prepaidExpenses: 0,
          otherCurrentAssets: 0,
          totalCurrentAssets: 0
        },
        currentLiabilities: {
          accountsPayable: 0,
          accruedExpenses: 0,
          shortTermDebt: 0,
          otherCurrentLiabilities: 0,
          totalCurrentLiabilities: 0
        },
        workingCapital: 0,
        workingCapitalRatio: 0,
        daysSalesOutstanding: 0,
        daysInventoryOutstanding: 0,
        daysPayablesOutstanding: 0,
        cashConversionCycle: 0
      },
      capitalStructure: {
        debt: {
          shortTermDebt: 0,
          longTermDebt: 0,
          totalDebt: 0,
          interestRate: 0,
          maturityDate: '',
          collateral: ''
        },
        equity: {
          commonStock: 0,
          preferredStock: 0,
          retainedEarnings: 0,
          totalEquity: 0
        },
        debtToEquity: 0,
        debtToEbitda: 0,
        interestCoverage: 0,
        weightedAverageCostOfCapital: 0
      },
      financialEfficiency: 0
    },
    assetAnalysis: {
      tangibleAssets: {
        realEstate: [],
        equipment: [],
        vehicles: [],
        inventory: {
          category: '',
          bookValue: 0,
          fairMarketValue: 0,
          turnoverRate: 0,
          obsolescence: 0,
          netRealizableValue: 0
        },
        totalTangibleAssets: 0
      },
      intangibleAssets: {
        intellectualProperty: [],
        customerRelationships: [],
        contracts: [],
        licenses: [],
        goodwill: 0,
        totalIntangibleAssets: 0
      },
      totalAssets: 0
    },
    valuationMethods: {
      incomeApproach: {
        discountedCashFlow: {
          projectionPeriod: 5,
          terminalGrowthRate: 0.03,
          discountRate: 0.15,
          freeCashFlows: [],
          terminalValue: 0,
          presentValue: 0
        },
        capitalizationOfEarnings: {
          normalizedEarnings: 0,
          capitalizationRate: 0.2,
          value: 0
        }
      },
      marketApproach: {
        comparableCompanies: [],
        comparableTransactions: [],
        multiples: {
          priceToEarnings: 0,
          priceToBook: 0,
          priceToSales: 0,
          evToEbitda: 0,
          evToEbit: 0
        }
      },
      assetApproach: {
        adjustedBookValue: 0,
        liquidationValue: 0,
        replacementCost: 0
      }
    },
    riskAnalysis: {
      businessRisk: 0,
      financialRisk: 0,
      marketRisk: 0,
      regulatoryRisk: 0,
      operationalRisk: 0,
      totalRisk: 0
    },
    discountRates: {
      costOfEquity: 0.15,
      costOfDebt: 0.08,
      weightedAverageCostOfCapital: 0.12,
      riskFreeRate: 0.03,
      marketRiskPremium: 0.06,
      beta: 1.0,
      sizeRiskPremium: 0.02,
      companySpecificRisk: 0.03
    },
    valuationPlanning: {
      purpose: 'sale',
      standardOfValue: 'fair_market_value',
      premiseOfValue: 'going_concern',
      effectiveDate: new Date().toISOString().split('T')[0],
      reportType: 'detailed',
      assumptions: [],
      limitations: []
    }
  });

  const [results, setResults] = useState<BusinessValuationCalculatorOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});

  useEffect(() => {
    const validation = validateBusinessValuationCalculatorInputs(inputs);
    if (validation.isValid) {
      try {
        const calculatedResults = calculateBusinessValuation(inputs);
        setResults(calculatedResults);
        setErrors({});
      } catch (error) {
        setErrors({ calculation: 'Error calculating business valuation' });
      }
    } else {
      setErrors(validation.errors || {});
    }
  }, [inputs]);

  const handleInputChange = (field: string, value: any) => {
    const fieldPath = field.split('.');
    setInputs(prev => {
      const newInputs = { ...prev };
      let current: any = newInputs;
      
      for (let i = 0; i < fieldPath.length - 1; i++) {
        current = current[fieldPath[i]];
      }
      
      current[fieldPath[fieldPath.length - 1]] = value;
      
      // Perform quick validation
      const validation = validateField(field, value, newInputs);
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
      
      if (validation.warning) {
        setWarnings(prev => ({ ...prev, [field]: validation.warning || '' }));
      } else {
        setWarnings(prev => {
          const newWarnings = { ...prev };
          delete newWarnings[field];
          return newWarnings;
        });
      }
      
      return newInputs;
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Business Valuation Calculator</h1>
        <p className="text-muted-foreground">
          Comprehensive business valuation using multiple approaches and methodologies
        </p>
      </div>

      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            Please fix the following errors:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {Object.keys(warnings).length > 0 && (
        <Alert>
          <AlertDescription>
            Warnings:
            <ul className="mt-2 list-disc list-inside">
              {Object.entries(warnings).map(([field, warning]) => (
                <li key={field}>{warning}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="inputs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inputs">Business Information</TabsTrigger>
          <TabsTrigger value="financials">Financial Data</TabsTrigger>
          <TabsTrigger value="assets">Asset Analysis</TabsTrigger>
          <TabsTrigger value="valuation">Valuation Methods</TabsTrigger>
          <TabsTrigger value="results">Valuation Results</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Business Information</CardTitle>
              <CardDescription>Enter the fundamental details about the business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={inputs.businessInfo.basicInfo.businessName}
                    onChange={(e) => handleInputChange('businessInfo.basicInfo.businessName', e.target.value)}
                    placeholder="Enter business name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Select
                    value={inputs.businessInfo.basicInfo.businessType}
                    onValueChange={(value) => handleInputChange('businessInfo.basicInfo.businessType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="s_corporation">S Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    value={inputs.businessInfo.basicInfo.industry}
                    onChange={(e) => handleInputChange('businessInfo.basicInfo.industry', e.target.value)}
                    placeholder="Enter industry"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    type="number"
                    value={inputs.businessInfo.basicInfo.yearEstablished}
                    onChange={(e) => handleInputChange('businessInfo.basicInfo.yearEstablished', parseInt(e.target.value) || 0)}
                    placeholder="Enter year established"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={inputs.businessInfo.basicInfo.businessDescription}
                  onChange={(e) => handleInputChange('businessInfo.basicInfo.businessDescription', e.target.value)}
                  placeholder="Describe the business operations, products/services, and market position"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Enter historical and projected financial data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="revenue">Annual Revenue</Label>
                  <Input
                    id="revenue"
                    type="number"
                    placeholder="Enter annual revenue"
                    onChange={(e) => {
                      const revenue = parseFloat(e.target.value) || 0;
                      // Update the most recent historical financials
                      if (inputs.financialInfo.historicalFinancials.length > 0) {
                        const updated = [...inputs.financialInfo.historicalFinancials];
                        updated[updated.length - 1] = {
                          ...updated[updated.length - 1],
                          revenue
                        };
                        handleInputChange('financialInfo.historicalFinancials', updated);
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ebitda">EBITDA</Label>
                  <Input
                    id="ebitda"
                    type="number"
                    placeholder="Enter EBITDA"
                    onChange={(e) => {
                      const ebitda = parseFloat(e.target.value) || 0;
                      if (inputs.financialInfo.historicalFinancials.length > 0) {
                        const updated = [...inputs.financialInfo.historicalFinancials];
                        updated[updated.length - 1] = {
                          ...updated[updated.length - 1],
                          ebitda
                        };
                        handleInputChange('financialInfo.historicalFinancials', updated);
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="netIncome">Net Income</Label>
                  <Input
                    id="netIncome"
                    type="number"
                    placeholder="Enter net income"
                    onChange={(e) => {
                      const netIncome = parseFloat(e.target.value) || 0;
                      if (inputs.financialInfo.historicalFinancials.length > 0) {
                        const updated = [...inputs.financialInfo.historicalFinancials];
                        updated[updated.length - 1] = {
                          ...updated[updated.length - 1],
                          netIncome
                        };
                        handleInputChange('financialInfo.historicalFinancials', updated);
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Asset Analysis</CardTitle>
              <CardDescription>Analyze tangible and intangible assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalAssets">Total Assets</Label>
                  <Input
                    id="totalAssets"
                    type="number"
                    value={inputs.assetAnalysis.totalAssets}
                    onChange={(e) => handleInputChange('assetAnalysis.totalAssets', parseFloat(e.target.value) || 0)}
                    placeholder="Enter total assets"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tangibleAssets">Tangible Assets</Label>
                  <Input
                    id="tangibleAssets"
                    type="number"
                    value={inputs.assetAnalysis.tangibleAssets.totalTangibleAssets}
                    onChange={(e) => handleInputChange('assetAnalysis.tangibleAssets.totalTangibleAssets', parseFloat(e.target.value) || 0)}
                    placeholder="Enter tangible assets"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Valuation Methods</CardTitle>
              <CardDescription>Configure valuation approaches and parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountRate">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    type="number"
                    value={inputs.valuationMethods.incomeApproach.discountedCashFlow.discountRate * 100}
                    onChange={(e) => handleInputChange('valuationMethods.incomeApproach.discountedCashFlow.discountRate', (parseFloat(e.target.value) || 0) / 100)}
                    placeholder="Enter discount rate"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="terminalGrowth">Terminal Growth Rate (%)</Label>
                  <Input
                    id="terminalGrowth"
                    type="number"
                    value={inputs.valuationMethods.incomeApproach.discountedCashFlow.terminalGrowthRate * 100}
                    onChange={(e) => handleInputChange('valuationMethods.incomeApproach.discountedCashFlow.terminalGrowthRate', (parseFloat(e.target.value) || 0) / 100)}
                    placeholder="Enter terminal growth rate"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {results ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Valuation Summary</CardTitle>
                  <CardDescription>Key valuation metrics and results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {formatCurrency(results.enterpriseValue)}
                      </div>
                      <div className="text-sm text-muted-foreground">Enterprise Value</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCurrency(results.equityValue)}
                      </div>
                      <div className="text-sm text-muted-foreground">Equity Value</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {formatCurrency(results.valuePerShare)}
                      </div>
                      <div className="text-sm text-muted-foreground">Value Per Share</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Valuation Multiple</Label>
                      <div className="text-lg font-semibold">
                        {results.valuationMultiple.toFixed(2)}x
                      </div>
                    </div>
                    
                    <div>
                      <Label>Discount Rate</Label>
                      <div className="text-lg font-semibold">
                        {formatPercentage(results.discountRate)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Recommendation</Label>
                    <Badge variant={results.recommendation === 'excellent' ? 'default' : 'secondary'}>
                      {results.recommendation.charAt(0).toUpperCase() + results.recommendation.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Valuation Methods Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Income Approach</Label>
                      <div className="text-lg font-semibold">
                        {formatCurrency(results.incomeApproach)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Market Approach</Label>
                      <div className="text-lg font-semibold">
                        {formatCurrency(results.marketApproach)}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Asset Approach</Label>
                      <div className="text-lg font-semibold">
                        {formatCurrency(results.assetApproach)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">
                  Enter business information and financial data to see valuation results
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}