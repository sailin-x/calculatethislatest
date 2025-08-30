import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { OpportunityZoneInvestmentInputs, OpportunityZoneInvestmentOutputs } from './types';
import { calculateOpportunityZoneInvestment } from './formulas';
import { validateOpportunityZoneInvestmentInputs } from './validation';
import { validateField } from './quickValidation';

interface OpportunityZoneInvestmentCalculatorProps {
  onCalculate?: (results: OpportunityZoneInvestmentOutputs) => void;
  initialInputs?: Partial<OpportunityZoneInvestmentInputs>;
}

export function OpportunityZoneInvestmentCalculator({ onCalculate, initialInputs }: OpportunityZoneInvestmentCalculatorProps) {
  const [inputs, setInputs] = useState<OpportunityZoneInvestmentInputs>({
    // Investment Information
    investmentAmount: 1000000,
    investmentDate: new Date().toISOString().split('T')[0],
    investmentType: 'real_estate',
    investmentStructure: 'direct',
    
    // Property Information
    propertyValue: 1500000,
    propertyAddress: '123 Opportunity St, Zone City, USA',
    propertyType: 'mixed_use',
    propertySize: 20000,
    propertyAge: 10,
    numberOfUnits: 50,
    
    // Opportunity Zone Information
    opportunityZoneLocation: 'Zone City, State',
    opportunityZoneDesignation: 'OZ-2023-001',
    opportunityZoneTier: 'tier_1',
    opportunityZoneBenefits: [
      { benefit: 'Tax Deferral', applicable: true, details: 'Defer capital gains until 2026' },
      { benefit: 'Tax Exclusion', applicable: true, details: 'Exclude 10% of gains after 5 years' },
      { benefit: 'Basis Step-Up', applicable: true, details: 'Step-up basis to fair market value after 10 years' }
    ],
    
    // Tax Information
    originalGainAmount: 500000,
    originalGainDate: new Date().toISOString().split('T')[0],
    originalGainType: 'capital_gain',
    investorTaxRate: 23.8,
    stateTaxRate: 5.0,
    localTaxRate: 2.0,
    
    // Investment Timeline
    investmentPeriod: 10,
    deferralPeriod: 7,
    exclusionPeriod: 5,
    basisStepUpPeriod: 10,
    exitDate: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    
    // Revenue Projections
    revenueProjections: [
      { year: 1, revenue: 200000, expenses: 80000, noi: 120000, appreciation: 3.0 },
      { year: 2, revenue: 210000, expenses: 84000, noi: 126000, appreciation: 3.5 },
      { year: 3, revenue: 220500, expenses: 88200, noi: 132300, appreciation: 4.0 },
      { year: 4, revenue: 231525, expenses: 92610, noi: 138915, appreciation: 4.5 },
      { year: 5, revenue: 243101, expenses: 97240, noi: 145861, appreciation: 5.0 },
      { year: 6, revenue: 255256, expenses: 102102, noi: 153154, appreciation: 5.5 },
      { year: 7, revenue: 268019, expenses: 107208, noi: 160811, appreciation: 6.0 },
      { year: 8, revenue: 281420, expenses: 112568, noi: 168852, appreciation: 6.5 },
      { year: 9, revenue: 295491, expenses: 118196, noi: 177295, appreciation: 7.0 },
      { year: 10, revenue: 310266, expenses: 124106, noi: 186160, appreciation: 7.5 }
    ],
    
    // Tax Benefits
    taxDeferral: true,
    taxExclusion: true,
    basisStepUp: true,
    deferralPercentage: 100,
    exclusionPercentage: 10,
    basisStepUpPercentage: 100,
    
    // Investment Returns
    expectedAnnualReturn: 12.0,
    expectedAppreciation: 5.0,
    expectedCashFlow: 8.0,
    expectedExitValue: 2500000,
    
    // Market Information
    marketLocation: 'urban',
    marketCondition: 'growing',
    marketGrowthRate: 4.0,
    comparableInvestments: [
      { investment: 'Traditional Real Estate', roi: 8.5, irr: 10.2, capRate: 6.5 },
      { investment: 'REIT', roi: 7.2, irr: 8.8, capRate: 5.8 },
      { investment: 'Private Equity', roi: 15.0, irr: 18.5, capRate: 8.2 }
    ],
    
    // Risk Factors
    marketRisk: 'medium',
    regulatoryRisk: 'low',
    liquidityRisk: 'high',
    developmentRisk: 'medium',
    
    // Analysis Parameters
    analysisPeriod: 10,
    inflationRate: 2.5,
    discountRate: 10.0,
    taxDeductionPeriod: 10,
    
    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'percentage',
    includeCharts: true,
    ...initialInputs
  });

  const [results, setResults] = useState<OpportunityZoneInvestmentOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof OpportunityZoneInvestmentInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || '' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateInputs = (): boolean => {
    const validation = validateOpportunityZoneInvestmentInputs(inputs);
    if (!validation.isValid) {
      setErrors(validation.errors || {});
      return false;
    }
    setErrors({});
    return true;
  };

  const calculate = async () => {
    if (!validateInputs()) return;
    
    setIsCalculating(true);
    try {
      const calculatedResults = calculateOpportunityZoneInvestment(inputs);
      setResults(calculatedResults);
      onCalculate?.(calculatedResults);
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: inputs.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatValue = (value: number, type: 'currency' | 'percentage' | 'number' = 'currency') => {
    switch (type) {
      case 'currency':
        return formatCurrency(value);
      case 'percentage':
        return formatPercentage(value);
      case 'number':
        return formatNumber(value);
      default:
        return formatCurrency(value);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Opportunity Zone Investment ROI Calculator
            <Badge variant="secondary">Finance</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              {/* Investment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Investment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentAmount">Investment Amount</Label>
                    <Input
                      id="investmentAmount"
                      type="number"
                      value={inputs.investmentAmount}
                      onChange={(e) => handleInputChange('investmentAmount', parseFloat(e.target.value))}
                      placeholder="1000000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentDate">Investment Date</Label>
                    <Input
                      id="investmentDate"
                      type="date"
                      value={inputs.investmentDate}
                      onChange={(e) => handleInputChange('investmentDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentType">Investment Type</Label>
                    <Select value={inputs.investmentType} onValueChange={(value) => handleInputChange('investmentType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real_estate">Real Estate</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="mixed_use">Mixed Use</SelectItem>
                        <SelectItem value="development">Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investmentStructure">Investment Structure</Label>
                    <Select value={inputs.investmentStructure} onValueChange={(value) => handleInputChange('investmentStructure', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="fund">Fund</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="syndication">Syndication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Property Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      type="number"
                      value={inputs.propertyValue}
                      onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value))}
                      placeholder="1500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="industrial">Industrial</SelectItem>
                        <SelectItem value="multifamily">Multifamily</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="mixed_use">Mixed Use</SelectItem>
                        <SelectItem value="land">Land</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                    <Input
                      id="propertySize"
                      type="number"
                      value={inputs.propertySize}
                      onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value))}
                      placeholder="20000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberOfUnits">Number of Units</Label>
                    <Input
                      id="numberOfUnits"
                      type="number"
                      value={inputs.numberOfUnits}
                      onChange={(e) => handleInputChange('numberOfUnits', parseFloat(e.target.value))}
                      placeholder="50"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Opportunity Zone Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Opportunity Zone Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="opportunityZoneLocation">Zone Location</Label>
                    <Input
                      id="opportunityZoneLocation"
                      type="text"
                      value={inputs.opportunityZoneLocation}
                      onChange={(e) => handleInputChange('opportunityZoneLocation', e.target.value)}
                      placeholder="Zone City, State"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="opportunityZoneTier">Zone Tier</Label>
                    <Select value={inputs.opportunityZoneTier} onValueChange={(value) => handleInputChange('opportunityZoneTier', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tier_1">Tier 1 (Low Income)</SelectItem>
                        <SelectItem value="tier_2">Tier 2 (Contiguous)</SelectItem>
                        <SelectItem value="tier_3">Tier 3 (Other)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Tax Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tax Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalGainAmount">Original Gain Amount</Label>
                    <Input
                      id="originalGainAmount"
                      type="number"
                      value={inputs.originalGainAmount}
                      onChange={(e) => handleInputChange('originalGainAmount', parseFloat(e.target.value))}
                      placeholder="500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalGainType">Gain Type</Label>
                    <Select value={inputs.originalGainType} onValueChange={(value) => handleInputChange('originalGainType', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="capital_gain">Capital Gain</SelectItem>
                        <SelectItem value="ordinary_income">Ordinary Income</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="investorTaxRate">Investor Tax Rate (%)</Label>
                    <Input
                      id="investorTaxRate"
                      type="number"
                      value={inputs.investorTaxRate}
                      onChange={(e) => handleInputChange('investorTaxRate', parseFloat(e.target.value))}
                      placeholder="23.8"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stateTaxRate">State Tax Rate (%)</Label>
                    <Input
                      id="stateTaxRate"
                      type="number"
                      value={inputs.stateTaxRate}
                      onChange={(e) => handleInputChange('stateTaxRate', parseFloat(e.target.value))}
                      placeholder="5.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localTaxRate">Local Tax Rate (%)</Label>
                    <Input
                      id="localTaxRate"
                      type="number"
                      value={inputs.localTaxRate}
                      onChange={(e) => handleInputChange('localTaxRate', parseFloat(e.target.value))}
                      placeholder="2.0"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Investment Timeline */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Investment Timeline</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="investmentPeriod">Investment Period (years)</Label>
                    <Input
                      id="investmentPeriod"
                      type="number"
                      value={inputs.investmentPeriod}
                      onChange={(e) => handleInputChange('investmentPeriod', parseFloat(e.target.value))}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deferralPeriod">Deferral Period (years)</Label>
                    <Input
                      id="deferralPeriod"
                      type="number"
                      value={inputs.deferralPeriod}
                      onChange={(e) => handleInputChange('deferralPeriod', parseFloat(e.target.value))}
                      placeholder="7"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exclusionPeriod">Exclusion Period (years)</Label>
                    <Input
                      id="exclusionPeriod"
                      type="number"
                      value={inputs.exclusionPeriod}
                      onChange={(e) => handleInputChange('exclusionPeriod', parseFloat(e.target.value))}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Investment Returns */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Investment Returns</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expectedAnnualReturn">Expected Annual Return (%)</Label>
                    <Input
                      id="expectedAnnualReturn"
                      type="number"
                      value={inputs.expectedAnnualReturn}
                      onChange={(e) => handleInputChange('expectedAnnualReturn', parseFloat(e.target.value))}
                      placeholder="12.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedAppreciation">Expected Appreciation (%)</Label>
                    <Input
                      id="expectedAppreciation"
                      type="number"
                      value={inputs.expectedAppreciation}
                      onChange={(e) => handleInputChange('expectedAppreciation', parseFloat(e.target.value))}
                      placeholder="5.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedCashFlow">Expected Cash Flow (%)</Label>
                    <Input
                      id="expectedCashFlow"
                      type="number"
                      value={inputs.expectedCashFlow}
                      onChange={(e) => handleInputChange('expectedCashFlow', parseFloat(e.target.value))}
                      placeholder="8.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedExitValue">Expected Exit Value</Label>
                    <Input
                      id="expectedExitValue"
                      type="number"
                      value={inputs.expectedExitValue}
                      onChange={(e) => handleInputChange('expectedExitValue', parseFloat(e.target.value))}
                      placeholder="2500000"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Risk Factors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Risk Factors</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="marketRisk">Market Risk</Label>
                    <Select value={inputs.marketRisk} onValueChange={(value) => handleInputChange('marketRisk', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="regulatoryRisk">Regulatory Risk</Label>
                    <Select value={inputs.regulatoryRisk} onValueChange={(value) => handleInputChange('regulatoryRisk', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="liquidityRisk">Liquidity Risk</Label>
                    <Select value={inputs.liquidityRisk} onValueChange={(value) => handleInputChange('liquidityRisk', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="developmentRisk">Development Risk</Label>
                    <Select value={inputs.developmentRisk} onValueChange={(value) => handleInputChange('developmentRisk', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    Please fix the following errors:
                    <ul className="list-disc list-inside mt-2">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={calculate} disabled={isCalculating} className="w-full">
                {isCalculating ? 'Calculating...' : 'Calculate ROI'}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* Core ROI Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Opportunity Zone Investment Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {formatValue(results.totalReturn, 'percentage')}
                          </div>
                          <div className="text-sm text-gray-600">Total Return</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatValue(results.internalRateOfReturn, 'percentage')}
                          </div>
                          <div className="text-sm text-gray-600">IRR</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatValue(results.totalTaxBenefit)}
                          </div>
                          <div className="text-sm text-gray-600">Total Tax Benefit</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatValue(results.afterTaxReturn, 'percentage')}
                          </div>
                          <div className="text-sm text-gray-600">After-Tax Return</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tax Benefits Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Tax Benefits Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-lg font-semibold text-green-600">{formatValue(results.taxDeferralBenefit)}</div>
                          <div className="text-sm text-gray-600">Tax Deferral Benefit</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-lg font-semibold text-blue-600">{formatValue(results.taxExclusionBenefit)}</div>
                          <div className="text-sm text-gray-600">Tax Exclusion Benefit</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-lg font-semibold text-purple-600">{formatValue(results.basisStepUpBenefit)}</div>
                          <div className="text-sm text-gray-600">Basis Step-Up Benefit</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investment Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Investment Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.cashOnCashReturn, 'percentage')}</div>
                          <div className="text-sm text-gray-600">Cash-on-Cash Return</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.equityMultiple, 'number')}x</div>
                          <div className="text-sm text-gray-600">Equity Multiple</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.netPresentValue)}</div>
                          <div className="text-sm text-gray-600">Net Present Value</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.paybackPeriod, 'number')} years</div>
                          <div className="text-sm text-gray-600">Payback Period</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.effectiveTaxRate, 'percentage')}</div>
                          <div className="text-sm text-gray-600">Effective Tax Rate</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-lg font-semibold">{formatValue(results.riskScore, 'number')}</div>
                          <div className="text-sm text-gray-600">Risk Score</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate ROI to see results</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <div className="space-y-6">
                  {/* Analysis Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Analysis Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="text-center">
                          <Badge variant={results.analysis.investmentRating === 'Excellent' ? 'default' : 'secondary'}>
                            {results.analysis.investmentRating}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Investment Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.taxBenefitRating === 'High Benefit' ? 'default' : 'secondary'}>
                            {results.analysis.taxBenefitRating}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Tax Benefit Rating</div>
                        </div>
                        <div className="text-center">
                          <Badge variant={results.analysis.recommendation === 'Proceed' ? 'default' : 'secondary'}>
                            {results.analysis.recommendation}
                          </Badge>
                          <div className="text-sm text-gray-600 mt-1">Recommendation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendation */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-medium">{results.analysis.recommendation}</p>
                    </CardContent>
                  </Card>

                  {/* Key Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="text-green-700">{strength}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Areas for Improvement</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc list-inside space-y-1">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="text-red-700">{weakness}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Market Risk</h4>
                          <p className="text-gray-600">{results.analysis.marketRisk}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Regulatory Risk</h4>
                          <p className="text-gray-600">{results.analysis.regulatoryRisk}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Liquidity Risk</h4>
                          <p className="text-gray-600">{results.analysis.liquidityRisk}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Development Risk</h4>
                          <p className="text-gray-600">{results.analysis.developmentRisk}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate ROI to see analysis</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              {results?.comparisonAnalysis ? (
                <div className="space-y-6">
                  {/* Comparison Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Comparison Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.comparisonAnalysis.map((comparison, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="font-medium">{comparison.metric}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-green-600 font-semibold">{formatValue(comparison.opportunityZone, 'percentage')}</span>
                              <span className="text-gray-400">vs</span>
                              <span className="text-gray-600">{formatValue(comparison.traditional, 'percentage')}</span>
                              <Badge variant={comparison.difference > 0 ? 'default' : 'secondary'}>
                                {comparison.difference > 0 ? '+' : ''}{formatValue(comparison.difference, 'percentage')}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate ROI to see comparison</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}