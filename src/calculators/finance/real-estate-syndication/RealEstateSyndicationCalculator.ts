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
import { Textarea } from '@/components/ui/textarea';
import { RealEstateSyndicationInputs, RealEstateSyndicationOutputs } from './types';
import { calculateRealEstateSyndication } from './formulas';
import { validateRealEstateSyndicationInputs } from './validation';
import { validateField } from './quickValidation';

interface RealEstateSyndicationCalculatorProps {
  onCalculate?: (results: RealEstateSyndicationOutputs) => void;
  initialInputs?: Partial<RealEstateSyndicationInputs>;
}

export function RealEstateSyndicationCalculator({ 
  onCalculate, 
  initialInputs 
}: RealEstateSyndicationCalculatorProps) {
  const [inputs, setInputs] = useState<RealEstateSyndicationInputs>({
    // Project Information
    projectName: '',
    projectType: 'multifamily',
    projectAddress: '',
    acquisitionDate: '',
    projectedHoldPeriod: 5,
    exitStrategy: 'sale',
    
    // Property Details
    totalAcquisitionCost: 5000000,
    propertyValue: 5000000,
    landValue: 1000000,
    buildingValue: 3500000,
    squareFootage: 50000,
    numberOfUnits: 50,
    occupancyRate: 95,
    currentRentRoll: 600000,
    projectedRentGrowth: 3,
    operatingExpenses: 180000,
    operatingExpenseRatio: 30,
    
    // Financing Structure
    totalEquityNeeded: 1500000,
    sponsorEquity: 300000,
    investorEquity: 1200000,
    debtFinancing: 3500000,
    loanType: 'conventional',
    interestRate: 5.5,
    loanTerm: 30,
    amortizationPeriod: 30,
    loanPoints: 1,
    loanFees: 35000,
    
    // Syndication Structure
    syndicationType: '506(b)',
    minimumInvestment: 50000,
    maximumInvestors: 35,
    sponsorPromote: 20,
    managementFee: 5,
    acquisitionFee: 3,
    dispositionFee: 3,
    refinanceFee: 1,
    
    // Waterfall Structure
    preferredReturn: 8,
    catchUpPercentage: 80,
    promoteTier1: 20,
    promoteTier2: 25,
    promoteTier3: 30,
    tier1Threshold: 12,
    tier2Threshold: 15,
    tier3Threshold: 18,
    
    // Operating Assumptions
    grossRentMultiplier: 8.33,
    capRate: 6,
    exitCapRate: 5.5,
    appreciationRate: 3,
    inflationRate: 2,
    vacancyRate: 5,
    collectionLossRate: 2,
    maintenanceReserve: 200,
    capitalExpenditureReserve: 5,
    
    // Tax Information
    taxRate: 24,
    stateTaxRate: 5,
    localTaxRate: 2,
    depreciationMethod: 'straight-line',
    recoveryPeriod: 27.5,
    bonusDepreciationEligible: false,
    bonusDepreciationPercentage: 0,
    
    // Exit Assumptions
    exitYear: 5,
    exitValue: 6000000,
    sellingCosts: 6,
    refinanceAmount: 0,
    refinanceCosts: 0,
    
    // Investor Information
    investorCount: 24,
    averageInvestment: 50000,
    accreditedInvestorRequirement: true,
    foreignInvestorAllowed: false,
    selfDirectedIRAAllowed: true,
    
    // Compliance & Legal
    secCompliance: true,
    blueSkyCompliance: true,
    offeringMemorandum: true,
    operatingAgreement: true,
    subscriptionAgreement: true,
    legalFees: 25000,
    accountingFees: 15000,
    complianceFees: 10000,
    
    // Reporting Preferences
    reportFormat: 'detailed',
    includeCharts: true,
    includeTaxAnalysis: true,
    includeRiskAnalysis: true,
    currency: 'USD',
    displayFormat: 'currency',
    ...initialInputs
  });

  const [results, setResults] = useState<RealEstateSyndicationOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculate cross-field validations
  useEffect(() => {
    const newErrors = { ...errors };
    
    // Auto-calculate property value if not provided
    if (inputs.totalAcquisitionCost > 0 && inputs.propertyValue === 0) {
      setInputs(prev => ({ ...prev, propertyValue: inputs.totalAcquisitionCost }));
    }
    
    // Auto-calculate building value if not provided
    if (inputs.propertyValue > 0 && inputs.landValue > 0 && inputs.buildingValue === 0) {
      const calculatedBuildingValue = inputs.propertyValue - inputs.landValue;
      setInputs(prev => ({ ...prev, buildingValue: calculatedBuildingValue }));
    }
    
    // Auto-calculate investor equity if not provided
    if (inputs.totalEquityNeeded > 0 && inputs.sponsorEquity > 0 && inputs.investorEquity === 0) {
      const calculatedInvestorEquity = inputs.totalEquityNeeded - inputs.sponsorEquity;
      setInputs(prev => ({ ...prev, investorEquity: calculatedInvestorEquity }));
    }
    
    // Auto-calculate debt financing if not provided
    if (inputs.totalAcquisitionCost > 0 && inputs.totalEquityNeeded > 0 && inputs.debtFinancing === 0) {
      const calculatedDebtFinancing = inputs.totalAcquisitionCost - inputs.totalEquityNeeded;
      setInputs(prev => ({ ...prev, debtFinancing: calculatedDebtFinancing }));
    }
    
    // Validate equity structure
    if (inputs.totalEquityNeeded > 0 && inputs.sponsorEquity + inputs.investorEquity !== inputs.totalEquityNeeded) {
      newErrors.sponsorEquity = 'Sponsor Equity + Investor Equity must equal Total Equity Needed';
    } else {
      delete newErrors.sponsorEquity;
    }
    
    // Validate financing structure
    if (inputs.totalAcquisitionCost > 0 && inputs.totalEquityNeeded + inputs.debtFinancing !== inputs.totalAcquisitionCost) {
      newErrors.debtFinancing = 'Total Equity + Debt Financing must equal Total Acquisition Cost';
    } else {
      delete newErrors.debtFinancing;
    }
    
    setErrors(newErrors);
  }, [inputs.totalAcquisitionCost, inputs.propertyValue, inputs.landValue, inputs.buildingValue, inputs.totalEquityNeeded, inputs.sponsorEquity, inputs.investorEquity, inputs.debtFinancing]);

  const handleInputChange = (field: keyof RealEstateSyndicationInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    
    // Quick validation
    const validation = validateField(field, value, inputs);
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
    setErrors({});

    try {
      // Full validation
      const validation = validateRealEstateSyndicationInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const calculatedResults = calculateRealEstateSyndication(inputs);
      setResults(calculatedResults);
      
      if (onCalculate) {
        onCalculate(calculatedResults);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setErrors({ general: 'An error occurred during calculation. Please check your inputs.' });
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

  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'residential': return 'bg-blue-100 text-blue-800';
      case 'commercial': return 'bg-green-100 text-green-800';
      case 'mixed-use': return 'bg-purple-100 text-purple-800';
      case 'industrial': return 'bg-orange-100 text-orange-800';
      case 'retail': return 'bg-pink-100 text-pink-800';
      case 'office': return 'bg-indigo-100 text-indigo-800';
      case 'hotel': return 'bg-yellow-100 text-yellow-800';
      case 'multifamily': return 'bg-teal-100 text-teal-800';
      case 'single-family': return 'bg-cyan-100 text-cyan-800';
      case 'land-development': return 'bg-lime-100 text-lime-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSyndicationTypeColor = (type: string) => {
    switch (type) {
      case '506(b)': return 'bg-blue-100 text-blue-800';
      case '506(c)': return 'bg-green-100 text-green-800';
      case 'crowdfunding': return 'bg-purple-100 text-purple-800';
      case 'private-placement': return 'bg-orange-100 text-orange-800';
      case 'reit': return 'bg-pink-100 text-pink-800';
      case 'direct-investment': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Real Estate Syndication Calculator</span>
            <Badge variant="secondary">Syndication</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="cashflow">Cash Flow</TabsTrigger>
              <TabsTrigger value="waterfall">Waterfall</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="investors">Investors</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="projectName">Project Name</Label>
                      <Input
                        id="projectName"
                        value={inputs.projectName}
                        onChange={(e) => handleInputChange('projectName', e.target.value)}
                        placeholder="Enter project name"
                      />
                      {errors.projectName && <p className="text-red-500 text-sm">{errors.projectName}</p>}
                    </div>

                    <div>
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select value={inputs.projectType} onValueChange={(value) => handleInputChange('projectType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="multifamily">Multifamily</SelectItem>
                          <SelectItem value="single-family">Single-Family</SelectItem>
                          <SelectItem value="land-development">Land Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectAddress">Project Address</Label>
                      <Input
                        id="projectAddress"
                        value={inputs.projectAddress}
                        onChange={(e) => handleInputChange('projectAddress', e.target.value)}
                        placeholder="Enter project address"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="acquisitionDate">Acquisition Date</Label>
                        <Input
                          id="acquisitionDate"
                          type="date"
                          value={inputs.acquisitionDate}
                          onChange={(e) => handleInputChange('acquisitionDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="projectedHoldPeriod">Projected Hold Period (Years)</Label>
                        <Input
                          id="projectedHoldPeriod"
                          type="number"
                          value={inputs.projectedHoldPeriod}
                          onChange={(e) => handleInputChange('projectedHoldPeriod', parseInt(e.target.value) || 0)}
                          placeholder="5"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="exitStrategy">Exit Strategy</Label>
                      <Select value={inputs.exitStrategy} onValueChange={(value) => handleInputChange('exitStrategy', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sale">Sale</SelectItem>
                          <SelectItem value="refinance">Refinance</SelectItem>
                          <SelectItem value="1031-exchange">1031 Exchange</SelectItem>
                          <SelectItem value="hold">Hold</SelectItem>
                          <SelectItem value="partial-sale">Partial Sale</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Property Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Property Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="totalAcquisitionCost">Total Acquisition Cost</Label>
                      <Input
                        id="totalAcquisitionCost"
                        type="number"
                        value={inputs.totalAcquisitionCost}
                        onChange={(e) => handleInputChange('totalAcquisitionCost', parseFloat(e.target.value) || 0)}
                        placeholder="5000000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="propertyValue">Property Value</Label>
                      <Input
                        id="propertyValue"
                        type="number"
                        value={inputs.propertyValue}
                        onChange={(e) => handleInputChange('propertyValue', parseFloat(e.target.value) || 0)}
                        placeholder="5000000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="landValue">Land Value</Label>
                        <Input
                          id="landValue"
                          type="number"
                          value={inputs.landValue}
                          onChange={(e) => handleInputChange('landValue', parseFloat(e.target.value) || 0)}
                          placeholder="1000000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="buildingValue">Building Value</Label>
                        <Input
                          id="buildingValue"
                          type="number"
                          value={inputs.buildingValue}
                          onChange={(e) => handleInputChange('buildingValue', parseFloat(e.target.value) || 0)}
                          placeholder="3500000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="squareFootage">Square Footage</Label>
                        <Input
                          id="squareFootage"
                          type="number"
                          value={inputs.squareFootage}
                          onChange={(e) => handleInputChange('squareFootage', parseFloat(e.target.value) || 0)}
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="numberOfUnits">Number of Units</Label>
                        <Input
                          id="numberOfUnits"
                          type="number"
                          value={inputs.numberOfUnits}
                          onChange={(e) => handleInputChange('numberOfUnits', parseInt(e.target.value) || 0)}
                          placeholder="50"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="currentRentRoll">Current Rent Roll (Annual)</Label>
                      <Input
                        id="currentRentRoll"
                        type="number"
                        value={inputs.currentRentRoll}
                        onChange={(e) => handleInputChange('currentRentRoll', parseFloat(e.target.value) || 0)}
                        placeholder="600000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="operatingExpenses">Operating Expenses (Annual)</Label>
                      <Input
                        id="operatingExpenses"
                        type="number"
                        value={inputs.operatingExpenses}
                        onChange={(e) => handleInputChange('operatingExpenses', parseFloat(e.target.value) || 0)}
                        placeholder="180000"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Financing Structure */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financing Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="totalEquityNeeded">Total Equity Needed</Label>
                      <Input
                        id="totalEquityNeeded"
                        type="number"
                        value={inputs.totalEquityNeeded}
                        onChange={(e) => handleInputChange('totalEquityNeeded', parseFloat(e.target.value) || 0)}
                        placeholder="1500000"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="sponsorEquity">Sponsor Equity</Label>
                        <Input
                          id="sponsorEquity"
                          type="number"
                          value={inputs.sponsorEquity}
                          onChange={(e) => handleInputChange('sponsorEquity', parseFloat(e.target.value) || 0)}
                          placeholder="300000"
                        />
                        {errors.sponsorEquity && <p className="text-red-500 text-sm">{errors.sponsorEquity}</p>}
                      </div>
                      <div>
                        <Label htmlFor="investorEquity">Investor Equity</Label>
                        <Input
                          id="investorEquity"
                          type="number"
                          value={inputs.investorEquity}
                          onChange={(e) => handleInputChange('investorEquity', parseFloat(e.target.value) || 0)}
                          placeholder="1200000"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="debtFinancing">Debt Financing</Label>
                      <Input
                        id="debtFinancing"
                        type="number"
                        value={inputs.debtFinancing}
                        onChange={(e) => handleInputChange('debtFinancing', parseFloat(e.target.value) || 0)}
                        placeholder="3500000"
                      />
                      {errors.debtFinancing && <p className="text-red-500 text-sm">{errors.debtFinancing}</p>}
                    </div>

                    <div>
                      <Label htmlFor="loanType">Loan Type</Label>
                      <Select value={inputs.loanType} onValueChange={(value) => handleInputChange('loanType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conventional">Conventional</SelectItem>
                          <SelectItem value="fha">FHA</SelectItem>
                          <SelectItem value="usda">USDA</SelectItem>
                          <SelectItem value="va">VA</SelectItem>
                          <SelectItem value="hard-money">Hard Money</SelectItem>
                          <SelectItem value="bridge">Bridge</SelectItem>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="permanent">Permanent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="interestRate">Interest Rate (%)</Label>
                        <Input
                          id="interestRate"
                          type="number"
                          value={inputs.interestRate}
                          onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                          placeholder="5.5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                        <Input
                          id="loanTerm"
                          type="number"
                          value={inputs.loanTerm}
                          onChange={(e) => handleInputChange('loanTerm', parseInt(e.target.value) || 0)}
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Syndication Structure */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Syndication Structure</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="syndicationType">Syndication Type</Label>
                      <Select value={inputs.syndicationType} onValueChange={(value) => handleInputChange('syndicationType', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="506(b)">506(b)</SelectItem>
                          <SelectItem value="506(c)">506(c)</SelectItem>
                          <SelectItem value="crowdfunding">Crowdfunding</SelectItem>
                          <SelectItem value="private-placement">Private Placement</SelectItem>
                          <SelectItem value="reit">REIT</SelectItem>
                          <SelectItem value="direct-investment">Direct Investment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="minimumInvestment">Minimum Investment</Label>
                        <Input
                          id="minimumInvestment"
                          type="number"
                          value={inputs.minimumInvestment}
                          onChange={(e) => handleInputChange('minimumInvestment', parseFloat(e.target.value) || 0)}
                          placeholder="50000"
                        />
                      </div>
                      <div>
                        <Label htmlFor="maximumInvestors">Maximum Investors</Label>
                        <Input
                          id="maximumInvestors"
                          type="number"
                          value={inputs.maximumInvestors}
                          onChange={(e) => handleInputChange('maximumInvestors', parseInt(e.target.value) || 0)}
                          placeholder="35"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="sponsorPromote">Sponsor Promote (%)</Label>
                      <Input
                        id="sponsorPromote"
                        type="number"
                        value={inputs.sponsorPromote}
                        onChange={(e) => handleInputChange('sponsorPromote', parseFloat(e.target.value) || 0)}
                        placeholder="20"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="managementFee">Management Fee (%)</Label>
                        <Input
                          id="managementFee"
                          type="number"
                          value={inputs.managementFee}
                          onChange={(e) => handleInputChange('managementFee', parseFloat(e.target.value) || 0)}
                          placeholder="5"
                        />
                      </div>
                      <div>
                        <Label htmlFor="acquisitionFee">Acquisition Fee (%)</Label>
                        <Input
                          id="acquisitionFee"
                          type="number"
                          value={inputs.acquisitionFee}
                          onChange={(e) => handleInputChange('acquisitionFee', parseFloat(e.target.value) || 0)}
                          placeholder="3"
                        />
                      </div>
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
                  {isCalculating ? 'Calculating...' : 'Calculate Syndication Analysis'}
                </Button>
              </div>

              {errors.general && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see results.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Key Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Investment Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatPercentage(results.metrics.projectedIRR)}
                          </div>
                          <div className="text-sm text-gray-600">Projected IRR</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatDecimal(results.metrics.projectedEquityMultiple)}
                          </div>
                          <div className="text-sm text-gray-600">Equity Multiple</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatPercentage(results.metrics.cashOnCashReturn)}
                          </div>
                          <div className="text-sm text-gray-600">Cash-on-Cash Return</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatPercentage(results.metrics.capRate)}
                          </div>
                          <div className="text-sm text-gray-600">Cap Rate</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investment Structure */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(results.metrics.totalEquityInvestment)}
                          </div>
                          <div className="text-sm text-gray-600">Total Equity</div>
                        </div>
                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">
                            {formatCurrency(results.metrics.totalDebtFinancing)}
                          </div>
                          <div className="text-sm text-gray-600">Debt Financing</div>
                        </div>
                        <div className="text-center p-4 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">
                            {formatPercentage(results.metrics.loanToValueRatio)}
                          </div>
                          <div className="text-sm text-gray-600">LTV Ratio</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Returns Comparison */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Returns Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {formatPercentage(results.metrics.investorIRR)}
                          </div>
                          <div className="text-sm text-gray-600">Investor IRR</div>
                        </div>
                        <div className="text-center p-4 bg-pink-50 rounded-lg">
                          <div className="text-2xl font-bold text-pink-600">
                            {formatPercentage(results.metrics.sponsorIRR)}
                          </div>
                          <div className="text-sm text-gray-600">Sponsor IRR</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="cashflow" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see cash flow projections.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Cash Flow Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cash Flow Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.metrics.netOperatingIncome)}
                          </div>
                          <div className="text-sm text-gray-600">Net Operating Income</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatCurrency(results.metrics.cashFlow)}
                          </div>
                          <div className="text-sm text-gray-600">Annual Cash Flow</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatCurrency(results.metrics.debtService)}
                          </div>
                          <div className="text-sm text-gray-600">Annual Debt Service</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Annual Cash Flow Projections */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Annual Cash Flow Projections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Year</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Gross Income</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">NOI</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Debt Service</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Cash Flow</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Cumulative</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.cashFlowProjections.slice(0, 10).map((projection, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{projection.year}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(projection.grossIncome)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(projection.netOperatingIncome)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(projection.debtService)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(projection.cashFlow)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatCurrency(projection.cumulativeCashFlow)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {results.cashFlowProjections.length > 10 && (
                          <p className="text-sm text-gray-600 mt-2">
                            Showing first 10 years of {results.cashFlowProjections.length} total years
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="waterfall" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see waterfall calculations.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Waterfall Structure */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Waterfall Structure</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-4 py-2 text-left">Tier</th>
                              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">IRR Threshold</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Promote %</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Investor Share</th>
                              <th className="border border-gray-300 px-4 py-2 text-right">Sponsor Share</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.waterfallCalculations.map((waterfall, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="border border-gray-300 px-4 py-2">{waterfall.tier}</td>
                                <td className="border border-gray-300 px-4 py-2">{waterfall.tierName}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(waterfall.irrThreshold)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(waterfall.promotePercentage)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(waterfall.investorShare)}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{formatPercentage(waterfall.sponsorShare)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see analysis.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Overall Risk:</span>
                          <Badge className={results.analysis.riskAssessment.overallRisk === 'low' ? 'bg-green-100 text-green-800' : results.analysis.riskAssessment.overallRisk === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                            {results.analysis.riskAssessment.overallRisk.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">Risk Score:</span>
                          <div className="flex items-center gap-2">
                            <Progress value={results.analysis.riskAssessment.riskScore} className="w-32" />
                            <span>{results.analysis.riskAssessment.riskScore}/100</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Benefits */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Benefits</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.keyBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Key Risks */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Risks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.keyRisks.map((risk, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">⚠</span>
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.analysis.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">→</span>
                            <span>{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>

            <TabsContent value="investors" className="space-y-6">
              {!results ? (
                <Alert>
                  <AlertDescription>Please enter your inputs and calculate to see investor information.</AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-6">
                  {/* Investor Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investor Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {results.investorSummary.totalInvestors}
                          </div>
                          <div className="text-sm text-gray-600">Total Investors</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(results.investorSummary.averageInvestment)}
                          </div>
                          <div className="text-sm text-gray-600">Average Investment</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {formatPercentage(results.investorSummary.projectedIRR)}
                          </div>
                          <div className="text-sm text-gray-600">Projected IRR</div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {formatDecimal(results.investorSummary.projectedEquityMultiple)}
                          </div>
                          <div className="text-sm text-gray-600">Equity Multiple</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Sponsor Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sponsor Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {formatCurrency(results.sponsorSummary.equityContribution)}
                          </div>
                          <div className="text-sm text-gray-600">Equity Contribution</div>
                        </div>
                        <div className="text-center p-4 bg-indigo-50 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600">
                            {formatCurrency(results.sponsorSummary.promoteValue)}
                          </div>
                          <div className="text-sm text-gray-600">Promote Value</div>
                        </div>
                        <div className="text-center p-4 bg-teal-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">
                            {formatPercentage(results.sponsorSummary.projectedIRR)}
                          </div>
                          <div className="text-sm text-gray-600">Projected IRR</div>
                        </div>
                        <div className="text-center p-4 bg-pink-50 rounded-lg">
                          <div className="text-2xl font-bold text-pink-600">
                            {formatCurrency(results.sponsorSummary.totalCompensation)}
                          </div>
                          <div className="text-sm text-gray-600">Total Compensation</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}