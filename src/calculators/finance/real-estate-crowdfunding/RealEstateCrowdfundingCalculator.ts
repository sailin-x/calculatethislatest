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
import { Checkbox } from '@/components/ui/checkbox';
import { RealEstateCrowdfundingInputs, RealEstateCrowdfundingOutputs } from './types';
import { calculateRealEstateCrowdfunding } from './formulas';
import { validateRealEstateCrowdfundingInputs } from './validation';
import { validateField } from './quickValidation';

interface RealEstateCrowdfundingCalculatorProps {
  onCalculate?: (results: RealEstateCrowdfundingOutputs) => void;
  initialInputs?: Partial<RealEstateCrowdfundingInputs>;
}

export function RealEstateCrowdfundingCalculator({ onCalculate, initialInputs }: RealEstateCrowdfundingCalculatorProps) {
  const [inputs, setInputs] = useState<RealEstateCrowdfundingInputs>({
    // Investment Information
    investmentAmount: 50000,
    minimumInvestment: 1000,
    maximumInvestment: 1000000,
    investmentType: 'equity',
    investmentTerm: 60,
    targetIRR: 12,
    targetCashOnCash: 8,
    targetEquityMultiple: 2.5,

    // Property Information
    propertyValue: 2000000,
    propertyType: 'multifamily',
    propertySize: 50000,
    propertyLocation: '',
    propertyCondition: 'good',
    propertyAge: 10,
    occupancyRate: 95,
    capRate: 6.5,

    // Financial Metrics
    purchasePrice: 2000000,
    downPayment: 400000,
    loanAmount: 1600000,
    interestRate: 5.5,
    loanTerm: 30,
    monthlyRent: 150000,
    annualRent: 1800000,
    operatingExpenses: 720000,
    propertyManagementFee: 5,
    vacancyRate: 5,
    maintenanceReserve: 90000,
    insuranceCost: 24000,
    propertyTaxRate: 1.2,

    // Crowdfunding Platform Information
    platformFee: 2,
    platformFeeType: 'percentage',
    minimumHoldPeriod: 12,
    liquidityOptions: 'secondary_market',
    secondaryMarketFee: 1,
    earlyExitPenalty: 5,

    // Market and Economic Factors
    marketAppreciationRate: 3,
    inflationRate: 2.5,
    localEconomicGrowth: 2,
    interestRateEnvironment: 'moderate',
    marketVolatility: 'medium',

    // Risk Factors
    propertyMarketRisk: 'medium',
    tenantCreditRisk: 'medium',
    interestRateRisk: 'medium',
    liquidityRisk: 'high',
    regulatoryRisk: 'low',
    sponsorTrackRecord: 'good',

    // Tax Considerations
    taxBracket: 24,
    stateTaxRate: 5,
    localTaxRate: 1,
    depreciationRecapture: true,
    section1031Eligible: false,
    qualifiedBusinessIncome: true,

    // Exit Strategy
    exitStrategy: 'sale',
    projectedExitValue: 2500000,
    projectedExitYear: 5,
    exitCosts: 125000,

    // Additional Investment Options
    leverageRatio: 80,
    preferredReturn: 8,
    promoteStructure: false,
    promotePercentage: 20,
    waterfallStructure: 'simple',

    // Analysis Parameters
    includeTaxes: true,
    includeInflation: true,
    includeAppreciation: true,
    includeLiquidity: true,
    riskAdjustment: true,
    scenarioAnalysis: true,

    // Reporting Preferences
    currency: 'USD',
    displayFormat: 'currency',
    includeCharts: true,
    includeComparisons: true,
    includeTimeline: true,
    ...initialInputs
  });

  const [results, setResults] = useState<RealEstateCrowdfundingOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate derived values
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    // Validate investment amount against min/max
    if (inputs.investmentAmount < inputs.minimumInvestment) {
      newErrors.investmentAmount = `Investment must be at least $${inputs.minimumInvestment.toLocaleString()}`;
    }
    if (inputs.investmentAmount > inputs.maximumInvestment) {
      newErrors.investmentAmount = `Investment cannot exceed $${inputs.maximumInvestment.toLocaleString()}`;
    }

    // Validate loan amount vs property value
    if (inputs.loanAmount > inputs.propertyValue * 0.95) {
      newErrors.loanAmount = 'Loan amount cannot exceed 95% of property value';
    }

    // Validate down payment
    const calculatedDownPayment = inputs.purchasePrice - inputs.loanAmount;
    if (Math.abs(inputs.downPayment - calculatedDownPayment) > 1000) {
      newErrors.downPayment = `Down payment should be $${calculatedDownPayment.toLocaleString()} based on purchase price and loan`;
    }

    setErrors(newErrors);
  }, [inputs.investmentAmount, inputs.minimumInvestment, inputs.maximumInvestment, inputs.loanAmount, inputs.propertyValue, inputs.purchasePrice, inputs.downPayment]);

  const handleInputChange = (field: keyof RealEstateCrowdfundingInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Quick validation for the changed field
    const validation = validateField(field, value, newInputs);
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [field]: validation.error || 'Invalid value' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const validation = validateRealEstateCrowdfundingInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculateRealEstateCrowdfunding(inputs);
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

  const formatDecimal = (value: number) => {
    return value.toFixed(2);
  };

  const getRatingColor = (rating: string) => {
    switch (rating.toLowerCase()) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'fair': return 'bg-yellow-100 text-yellow-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Real Estate Crowdfunding Calculator</span>
            <Badge variant="secondary">Investment</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="projections">Projections</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Investment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Investment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="investmentAmount">Investment Amount</Label>
                      <Input
                        id="investmentAmount"
                        type="number"
                        value={inputs.investmentAmount}
                        onChange={(e) => handleInputChange('investmentAmount', parseFloat(e.target.value) || 0)}
                        className={errors.investmentAmount ? 'border-red-500' : ''}
                      />
                      {errors.investmentAmount && (
                        <p className="text-sm text-red-500">{errors.investmentAmount}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investmentType">Investment Type</Label>
                      <Select value={inputs.investmentType} onValueChange={(value) => handleInputChange('investmentType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equity">Equity</SelectItem>
                          <SelectItem value="debt">Debt</SelectItem>
                          <SelectItem value="hybrid">Hybrid</SelectItem>
                          <SelectItem value="preferred_equity">Preferred Equity</SelectItem>
                          <SelectItem value="mezzanine">Mezzanine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="investmentTerm">Investment Term (months)</Label>
                      <Input
                        id="investmentTerm"
                        type="number"
                        value={inputs.investmentTerm}
                        onChange={(e) => handleInputChange('investmentTerm', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetIRR">Target IRR (%)</Label>
                      <Input
                        id="targetIRR"
                        type="number"
                        step="0.1"
                        value={inputs.targetIRR}
                        onChange={(e) => handleInputChange('targetIRR', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Property Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyValue">Property Value</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={inputs.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select value={inputs.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="multifamily">Multifamily</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                          <SelectItem value="mixed_use">Mixed Use</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="propertySize">Property Size (sq ft)</Label>
                      <Input
                        id="propertySize"
                        type="number"
                        value={inputs.propertySize}
                        onChange={(e) => handleInputChange('propertySize', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capRate">Cap Rate (%)</Label>
                      <Input
                        id="capRate"
                        type="number"
                        step="0.1"
                        value={inputs.capRate}
                        onChange={(e) => handleInputChange('capRate', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="purchasePrice">Purchase Price</Label>
                      <Input
                        id="purchasePrice"
                        type="number"
                        value={inputs.purchasePrice}
                        onChange={(e) => handleInputChange('purchasePrice', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={inputs.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                        className={errors.loanAmount ? 'border-red-500' : ''}
                      />
                      {errors.loanAmount && (
                        <p className="text-sm text-red-500">{errors.loanAmount}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        step="0.1"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="annualRent">Annual Rent</Label>
                      <Input
                        id="annualRent"
                        type="number"
                        value={inputs.annualRent}
                        onChange={(e) => handleInputChange('annualRent', parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Platform Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="platformFee">Platform Fee (%)</Label>
                      <Input
                        id="platformFee"
                        type="number"
                        step="0.1"
                        value={inputs.platformFee}
                        onChange={(e) => handleInputChange('platformFee', parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minimumHoldPeriod">Minimum Hold Period (months)</Label>
                      <Input
                        id="minimumHoldPeriod"
                        type="number"
                        value={inputs.minimumHoldPeriod}
                        onChange={(e) => handleInputChange('minimumHoldPeriod', parseInt(e.target.value) || 0)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="liquidityOptions">Liquidity Options</Label>
                      <Select value={inputs.liquidityOptions} onValueChange={(value) => handleInputChange('liquidityOptions', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="secondary_market">Secondary Market</SelectItem>
                          <SelectItem value="buyback_program">Buyback Program</SelectItem>
                          <SelectItem value="periodic_redemption">Periodic Redemption</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Factors</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="propertyMarketRisk">Property Market Risk</Label>
                      <Select value={inputs.propertyMarketRisk} onValueChange={(value) => handleInputChange('propertyMarketRisk', value)}>
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
                      <Label htmlFor="sponsorTrackRecord">Sponsor Track Record</Label>
                      <Select value={inputs.sponsorTrackRecord} onValueChange={(value) => handleInputChange('sponsorTrackRecord', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                          <SelectItem value="poor">Poor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Parameters */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Analysis Parameters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeTaxes"
                        checked={inputs.includeTaxes}
                        onCheckedChange={(checked) => handleInputChange('includeTaxes', checked)}
                      />
                      <Label htmlFor="includeTaxes">Include Tax Analysis</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeInflation"
                        checked={inputs.includeInflation}
                        onCheckedChange={(checked) => handleInputChange('includeInflation', checked)}
                      />
                      <Label htmlFor="includeInflation">Include Inflation</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeAppreciation"
                        checked={inputs.includeAppreciation}
                        onCheckedChange={(checked) => handleInputChange('includeAppreciation', checked)}
                      />
                      <Label htmlFor="includeAppreciation">Include Appreciation</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="riskAdjustment"
                        checked={inputs.riskAdjustment}
                        onCheckedChange={(checked) => handleInputChange('riskAdjustment', checked)}
                      />
                      <Label htmlFor="riskAdjustment">Risk Adjustment</Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleCalculate} 
                  disabled={isCalculating || Object.keys(errors).length > 0}
                  className="w-full max-w-md"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Investment Analysis'}
                </Button>
              </div>

              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Investment Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Investment Amount:</span>
                        <span className="font-semibold">{formatCurrency(results.investmentAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Effective Investment:</span>
                        <span className="font-semibold">{formatCurrency(results.effectiveInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Type:</span>
                        <span className="font-semibold capitalize">{results.investmentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Property Type:</span>
                        <span className="font-semibold capitalize">{results.propertyType}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Return Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Return Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Return:</span>
                        <span className="font-semibold">{formatCurrency(results.totalReturn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annualized Return:</span>
                        <span className="font-semibold">{formatPercentage(results.annualizedReturn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IRR:</span>
                        <span className="font-semibold">{formatPercentage(results.irr)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equity Multiple:</span>
                        <span className="font-semibold">{formatDecimal(results.equityMultiple)}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cash on Cash Return:</span>
                        <span className="font-semibold">{formatPercentage(results.cashOnCashReturn)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Risk Adjusted Return:</span>
                        <span className="font-semibold">{formatPercentage(results.riskAdjustedReturn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sharpe Ratio:</span>
                        <span className="font-semibold">{formatDecimal(results.sharpeRatio)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Drawdown:</span>
                        <span className="font-semibold">{formatPercentage(results.maximumDrawdown)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Value at Risk:</span>
                        <span className="font-semibold">{formatPercentage(results.valueAtRisk)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cash Flow Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cash Flow Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Monthly Cash Flow:</span>
                        <span className="font-semibold">{formatCurrency(results.monthlyCashFlow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Cash Flow:</span>
                        <span className="font-semibold">{formatCurrency(results.annualCashFlow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Cash Flow:</span>
                        <span className="font-semibold">{formatCurrency(results.totalCashFlow)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cash Flow Yield:</span>
                        <span className="font-semibold">{formatPercentage(results.cashFlowYield)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Platform Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Platform Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Platform Fees:</span>
                        <span className="font-semibold">{formatCurrency(results.platformFees)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Fees:</span>
                        <span className="font-semibold">{formatCurrency(results.totalFees)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Investment:</span>
                        <span className="font-semibold">{formatCurrency(results.netInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee Impact:</span>
                        <span className="font-semibold">{formatPercentage(results.feeImpact)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Liquidity Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Liquidity Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Liquidity Score:</span>
                        <span className="font-semibold">{formatDecimal(results.liquidityScore)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time to Liquidity:</span>
                        <span className="font-semibold">{results.timeToLiquidity} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Secondary Market Value:</span>
                        <span className="font-semibold">{formatCurrency(results.secondaryMarketValue)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate investment analysis to see results</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results?.analysis ? (
                <div className="space-y-6">
                  {/* Investment Ratings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Ratings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <Badge className={`w-full ${getRatingColor(results.analysis.investmentRating)}`}>
                            {results.analysis.investmentRating}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Investment Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge className={`w-full ${getRiskColor(results.analysis.riskRating)}`}>
                            {results.analysis.riskRating}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Risk Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge className={`w-full ${getRiskColor(results.analysis.liquidityRating)}`}>
                            {results.analysis.liquidityRating}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Liquidity Rating</p>
                        </div>
                        <div className="text-center">
                          <Badge className={`w-full ${getRatingColor(results.analysis.taxEfficiencyRating)}`}>
                            {results.analysis.taxEfficiencyRating}
                          </Badge>
                          <p className="text-sm text-gray-600 mt-1">Tax Efficiency</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendation */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Recommendation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700">{results.analysis.recommendation}</p>
                    </CardContent>
                  </Card>

                  {/* Key Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-green-700">Key Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-500 mt-1">✓</span>
                              <span>{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-red-700">Key Weaknesses</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {results.analysis.keyWeaknesses.map((weakness, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-500 mt-1">✗</span>
                              <span>{weakness}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Investment Risks:</h4>
                          <ul className="space-y-1">
                            {results.analysis.investmentRisks.map((risk, index) => (
                              <li key={index} className="text-sm text-gray-700">• {risk}</li>
                            ))}
                          </ul>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-semibold mb-2">Mitigation Strategies:</h4>
                          <ul className="space-y-1">
                            {results.analysis.mitigationStrategies.map((strategy, index) => (
                              <li key={index} className="text-sm text-gray-700">• {strategy}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Next Steps */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.nextSteps.map((step, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">{index + 1}.</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate investment analysis to see detailed analysis</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="projections" className="space-y-6">
              {results?.cashFlowProjections ? (
                <div className="space-y-6">
                  {/* Cash Flow Projections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cash Flow Projections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Period</th>
                              <th className="text-right py-2">Rental Income</th>
                              <th className="text-right py-2">Operating Expenses</th>
                              <th className="text-right py-2">Debt Service</th>
                              <th className="text-right py-2">Net Cash Flow</th>
                              <th className="text-right py-2">Cumulative</th>
                              <th className="text-right py-2">ROI</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.cashFlowProjections.slice(0, 12).map((projection, index) => (
                              <tr key={index} className="border-b">
                                <td className="py-2">{projection.period}</td>
                                <td className="text-right py-2">{formatCurrency(projection.rentalIncome)}</td>
                                <td className="text-right py-2">{formatCurrency(projection.operatingExpenses)}</td>
                                <td className="text-right py-2">{formatCurrency(projection.debtService)}</td>
                                <td className="text-right py-2 font-semibold">{formatCurrency(projection.netCashFlow)}</td>
                                <td className="text-right py-2">{formatCurrency(projection.cumulativeCashFlow)}</td>
                                <td className="text-right py-2">{formatPercentage(projection.returnOnInvestment)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Exit Scenarios */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Exit Scenarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {results.exitScenarios.map((scenario, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-2">{scenario.scenario}</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span>Probability:</span>
                                <span>{formatPercentage(scenario.probability)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Exit Value:</span>
                                <span>{formatCurrency(scenario.exitValue)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Return:</span>
                                <span>{formatPercentage(scenario.totalReturn)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>IRR:</span>
                                <span>{formatPercentage(scenario.irr)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Equity Multiple:</span>
                                <span>{formatDecimal(scenario.equityMultiple)}x</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Scenarios */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Scenarios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.riskScenarios.map((scenario, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold">{scenario.scenario}</h4>
                              <Badge className={getRiskColor(scenario.impact)}>
                                {scenario.impact.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{scenario.description}</p>
                            <div className="text-sm">
                              <span className="font-semibold">Mitigation:</span> {scenario.mitigation}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Calculate investment analysis to see projections</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}