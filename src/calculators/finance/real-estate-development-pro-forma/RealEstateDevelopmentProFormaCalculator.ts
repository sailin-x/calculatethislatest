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
import { RealEstateDevelopmentProFormaInputs, RealEstateDevelopmentProFormaOutputs } from './types';
import { calculateRealEstateDevelopmentProForma } from './formulas';
import { validateRealEstateDevelopmentProFormaInputs } from './validation';
import { validateField } from './quickValidation';

interface RealEstateDevelopmentProFormaCalculatorProps {
  onCalculate?: (results: RealEstateDevelopmentProFormaOutputs) => void;
  initialInputs?: Partial<RealEstateDevelopmentProFormaInputs>;
}

export function RealEstateDevelopmentProFormaCalculator({ 
  onCalculate, 
  initialInputs 
}: RealEstateDevelopmentProFormaCalculatorProps) {
  const [inputs, setInputs] = useState<RealEstateDevelopmentProFormaInputs>({
    // Project Information
    projectName: '',
    projectType: 'residential',
    projectPhase: 'concept',
    projectLocation: '',
    projectSize: 50000,
    landSize: 5,
    zoningType: '',
    density: 20,
    buildingHeight: 3,
    parkingRatio: 2,
    
    // Financial Assumptions
    landCost: 1000000,
    acquisitionCosts: 50000,
    constructionCost: 200,
    softCosts: 15,
    contingency: 10,
    financingCosts: 100000,
    marketingCosts: 50000,
    legalCosts: 25000,
    insuranceCosts: 15000,
    propertyTaxes: 20000,
    utilities: 10000,
    maintenanceCosts: 15000,
    managementFees: 5,
    vacancyRate: 5,
    rentGrowthRate: 3,
    expenseGrowthRate: 2,
    inflationRate: 2.5,
    discountRate: 10,
    exitCapRate: 6,
    holdPeriod: 5,
    
    // Revenue Assumptions
    unitMix: [],
    rentalRates: [],
    salesPrices: [],
    otherIncome: [],
    leaseTerms: [],
    tenantImprovements: [],
    concessions: [],
    
    // Construction Timeline
    constructionStartDate: new Date().toISOString().split('T')[0],
    constructionDuration: 18,
    leaseUpPeriod: 12,
    stabilizationPeriod: 6,
    constructionPhases: [],
    milestoneDates: [],
    
    // Financing
    loanAmount: 8000000,
    loanType: 'construction',
    interestRate: 6.5,
    loanTerm: 30,
    loanToCost: 75,
    loanToValue: 70,
    debtServiceCoverage: 1.25,
    interestOnlyPeriod: 18,
    prepaymentPenalty: 2,
    originationFee: 1,
    equityContribution: 3000000,
    equityReturn: 15,
    
    // Market Analysis
    marketRent: 2.5,
    marketVacancy: 5,
    marketCapRate: 6,
    marketAppreciation: 3,
    comparableSales: [],
    marketTrends: [],
    
    // Risk Factors
    constructionRisk: 5,
    marketRisk: 4,
    financingRisk: 3,
    regulatoryRisk: 4,
    environmentalRisk: 2,
    weatherRisk: 3,
    laborRisk: 4,
    materialRisk: 5,
    
    // Tax Considerations
    depreciationMethod: 'straight-line',
    taxRate: 25,
    taxIncentives: [],
    costSegregation: false,
    energyEfficiencyCredits: false,
    historicTaxCredits: false,
    
    // Exit Strategy
    exitStrategy: 'sale',
    exitTiming: 5,
    exitValue: 0,
    exitCosts: 6,
    reinvestmentPlan: '',
    
    // Sensitivity Analysis
    sensitivityScenarios: [],
    stressTests: [],
    breakEvenAnalysis: true,
    scenarioAnalysis: true,
    
    // Reporting Preferences
    reportFormat: 'detailed',
    includeCharts: true,
    includeAssumptions: true,
    includeSensitivity: true,
    includeComparables: true,
    currency: 'USD',
    displayFormat: 'currency',
    ...initialInputs
  });

  const [results, setResults] = useState<RealEstateDevelopmentProFormaOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  // Auto-calculations and cross-field validations
  useEffect(() => {
    const newErrors: Record<string, string> = {};
    
    // Auto-calculate total project cost
    const totalConstructionCost = inputs.projectSize * inputs.constructionCost;
    const softCostsAmount = totalConstructionCost * (inputs.softCosts / 100);
    const totalProjectCost = inputs.landCost + inputs.acquisitionCosts + totalConstructionCost + 
                           softCostsAmount + inputs.financingCosts + inputs.marketingCosts + 
                           inputs.legalCosts + inputs.insuranceCosts;
    
    // Validate loan amount vs total cost
    if (inputs.loanAmount > totalProjectCost * (inputs.loanToCost / 100)) {
      newErrors.loanAmount = `Loan amount exceeds ${inputs.loanToCost}% of total project cost`;
    }
    
    // Validate equity contribution
    const requiredEquity = totalProjectCost - inputs.loanAmount;
    if (inputs.equityContribution < requiredEquity) {
      newErrors.equityContribution = `Equity contribution must be at least $${requiredEquity.toLocaleString()}`;
    }
    
    // Validate construction timeline
    if (inputs.constructionDuration < 6) {
      newErrors.constructionDuration = 'Construction duration should be at least 6 months';
    }
    
    // Validate market assumptions
    if (inputs.marketRent < 0.5) {
      newErrors.marketRent = 'Market rent should be at least $0.50 per sq ft';
    }
    
    if (inputs.marketCapRate < 3 || inputs.marketCapRate > 12) {
      newErrors.marketCapRate = 'Market cap rate should be between 3% and 12%';
    }
    
    setErrors(newErrors);
  }, [inputs]);

  const handleInputChange = (field: keyof RealEstateDevelopmentProFormaInputs, value: any) => {
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

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      const validation = validateRealEstateDevelopmentProFormaInputs(inputs);
      if (!validation.isValid) {
        setErrors(validation.errors || {});
        return;
      }

      const results = calculateRealEstateDevelopmentProForma(inputs);
      setResults(results);
      onCalculate?.(results);
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

  const formatDecimal = (value: number, decimals: number = 2) => {
    return value.toFixed(decimals);
  };

  const getViabilityColor = (viability: string) => {
    switch (viability) {
      case 'highly-viable': return 'bg-green-100 text-green-800';
      case 'viable': return 'bg-blue-100 text-blue-800';
      case 'marginal': return 'bg-yellow-100 text-yellow-800';
      case 'not-viable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
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
            <span>Real Estate Development Pro-Forma Calculator</span>
            <Badge variant="secondary">Development</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inputs" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="inputs">Inputs</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="projections">Projections</TabsTrigger>
              <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            </TabsList>

            <TabsContent value="inputs" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                          <SelectItem value="single-family">Single Family</SelectItem>
                          <SelectItem value="land-development">Land Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="projectSize">Project Size (sq ft)</Label>
                      <Input
                        id="projectSize"
                        type="number"
                        value={inputs.projectSize}
                        onChange={(e) => handleInputChange('projectSize', parseFloat(e.target.value) || 0)}
                        placeholder="50000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="landSize">Land Size (acres)</Label>
                      <Input
                        id="landSize"
                        type="number"
                        value={inputs.landSize}
                        onChange={(e) => handleInputChange('landSize', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="constructionCost">Construction Cost ($/sq ft)</Label>
                      <Input
                        id="constructionCost"
                        type="number"
                        value={inputs.constructionCost}
                        onChange={(e) => handleInputChange('constructionCost', parseFloat(e.target.value) || 0)}
                        placeholder="200"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Assumptions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Assumptions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="landCost">Land Cost</Label>
                      <Input
                        id="landCost"
                        type="number"
                        value={inputs.landCost}
                        onChange={(e) => handleInputChange('landCost', parseFloat(e.target.value) || 0)}
                        placeholder="1000000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="softCosts">Soft Costs (%)</Label>
                      <Input
                        id="softCosts"
                        type="number"
                        value={inputs.softCosts}
                        onChange={(e) => handleInputChange('softCosts', parseFloat(e.target.value) || 0)}
                        placeholder="15"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contingency">Contingency (%)</Label>
                      <Input
                        id="contingency"
                        type="number"
                        value={inputs.contingency}
                        onChange={(e) => handleInputChange('contingency', parseFloat(e.target.value) || 0)}
                        placeholder="10"
                      />
                    </div>

                    <div>
                      <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
                      <Input
                        id="vacancyRate"
                        type="number"
                        value={inputs.vacancyRate}
                        onChange={(e) => handleInputChange('vacancyRate', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="discountRate">Discount Rate (%)</Label>
                      <Input
                        id="discountRate"
                        type="number"
                        value={inputs.discountRate}
                        onChange={(e) => handleInputChange('discountRate', parseFloat(e.target.value) || 0)}
                        placeholder="10"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Financing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financing</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={inputs.loanAmount}
                        onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                        placeholder="8000000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <Input
                        id="interestRate"
                        type="number"
                        value={inputs.interestRate}
                        onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                        placeholder="6.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="loanToCost">Loan to Cost (%)</Label>
                      <Input
                        id="loanToCost"
                        type="number"
                        value={inputs.loanToCost}
                        onChange={(e) => handleInputChange('loanToCost', parseFloat(e.target.value) || 0)}
                        placeholder="75"
                      />
                    </div>

                    <div>
                      <Label htmlFor="equityContribution">Equity Contribution</Label>
                      <Input
                        id="equityContribution"
                        type="number"
                        value={inputs.equityContribution}
                        onChange={(e) => handleInputChange('equityContribution', parseFloat(e.target.value) || 0)}
                        placeholder="3000000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="equityReturn">Target Equity Return (%)</Label>
                      <Input
                        id="equityReturn"
                        type="number"
                        value={inputs.equityReturn}
                        onChange={(e) => handleInputChange('equityReturn', parseFloat(e.target.value) || 0)}
                        placeholder="15"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="constructionStartDate">Construction Start Date</Label>
                      <Input
                        id="constructionStartDate"
                        type="date"
                        value={inputs.constructionStartDate}
                        onChange={(e) => handleInputChange('constructionStartDate', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="constructionDuration">Construction Duration (months)</Label>
                      <Input
                        id="constructionDuration"
                        type="number"
                        value={inputs.constructionDuration}
                        onChange={(e) => handleInputChange('constructionDuration', parseFloat(e.target.value) || 0)}
                        placeholder="18"
                      />
                    </div>

                    <div>
                      <Label htmlFor="leaseUpPeriod">Lease-Up Period (months)</Label>
                      <Input
                        id="leaseUpPeriod"
                        type="number"
                        value={inputs.leaseUpPeriod}
                        onChange={(e) => handleInputChange('leaseUpPeriod', parseFloat(e.target.value) || 0)}
                        placeholder="12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="holdPeriod">Hold Period (years)</Label>
                      <Input
                        id="holdPeriod"
                        type="number"
                        value={inputs.holdPeriod}
                        onChange={(e) => handleInputChange('holdPeriod', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Market Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Market Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="marketRent">Market Rent ($/sq ft)</Label>
                      <Input
                        id="marketRent"
                        type="number"
                        value={inputs.marketRent}
                        onChange={(e) => handleInputChange('marketRent', parseFloat(e.target.value) || 0)}
                        placeholder="2.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketCapRate">Market Cap Rate (%)</Label>
                      <Input
                        id="marketCapRate"
                        type="number"
                        value={inputs.marketCapRate}
                        onChange={(e) => handleInputChange('marketCapRate', parseFloat(e.target.value) || 0)}
                        placeholder="6"
                      />
                    </div>

                    <div>
                      <Label htmlFor="exitCapRate">Exit Cap Rate (%)</Label>
                      <Input
                        id="exitCapRate"
                        type="number"
                        value={inputs.exitCapRate}
                        onChange={(e) => handleInputChange('exitCapRate', parseFloat(e.target.value) || 0)}
                        placeholder="6"
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketAppreciation">Market Appreciation (%/year)</Label>
                      <Input
                        id="marketAppreciation"
                        type="number"
                        value={inputs.marketAppreciation}
                        onChange={(e) => handleInputChange('marketAppreciation', parseFloat(e.target.value) || 0)}
                        placeholder="3"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Risk Factors (1-10)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="constructionRisk">Construction Risk</Label>
                      <Input
                        id="constructionRisk"
                        type="number"
                        min="1"
                        max="10"
                        value={inputs.constructionRisk}
                        onChange={(e) => handleInputChange('constructionRisk', parseFloat(e.target.value) || 0)}
                        placeholder="5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="marketRisk">Market Risk</Label>
                      <Input
                        id="marketRisk"
                        type="number"
                        min="1"
                        max="10"
                        value={inputs.marketRisk}
                        onChange={(e) => handleInputChange('marketRisk', parseFloat(e.target.value) || 0)}
                        placeholder="4"
                      />
                    </div>

                    <div>
                      <Label htmlFor="financingRisk">Financing Risk</Label>
                      <Input
                        id="financingRisk"
                        type="number"
                        min="1"
                        max="10"
                        value={inputs.financingRisk}
                        onChange={(e) => handleInputChange('financingRisk', parseFloat(e.target.value) || 0)}
                        placeholder="3"
                      />
                    </div>

                    <div>
                      <Label htmlFor="regulatoryRisk">Regulatory Risk</Label>
                      <Input
                        id="regulatoryRisk"
                        type="number"
                        min="1"
                        max="10"
                        value={inputs.regulatoryRisk}
                        onChange={(e) => handleInputChange('regulatoryRisk', parseFloat(e.target.value) || 0)}
                        placeholder="4"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <ul className="list-disc list-inside">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <Button 
                onClick={handleCalculate} 
                disabled={isCalculating || Object.keys(errors).length > 0}
                className="w-full"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Pro-Forma'}
              </Button>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              {results ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Key Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Key Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Project Cost:</span>
                        <span className="font-semibold">{formatCurrency(results.metrics.totalProjectCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Revenue:</span>
                        <span className="font-semibold">{formatCurrency(results.metrics.totalRevenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Profit:</span>
                        <span className="font-semibold">{formatCurrency(results.metrics.totalProfit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Profit Margin:</span>
                        <span className="font-semibold">{formatPercentage(results.metrics.profitMargin)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IRR:</span>
                        <span className="font-semibold">{formatPercentage(results.metrics.internalRateOfReturn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>NPV:</span>
                        <span className="font-semibold">{formatCurrency(results.metrics.netPresentValue)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Returns */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Returns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Return on Cost:</span>
                        <span className="font-semibold">{formatPercentage(results.metrics.returnOnCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Return on Equity:</span>
                        <span className="font-semibold">{formatPercentage(results.metrics.returnOnEquity)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cash on Cash Return:</span>
                        <span className="font-semibold">{formatPercentage(results.metrics.cashOnCashReturn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equity Multiple:</span>
                        <span className="font-semibold">{formatDecimal(results.metrics.equityMultiple)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payback Period:</span>
                        <span className="font-semibold">{formatDecimal(results.metrics.paybackPeriod)} years</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Project Viability */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Project Viability</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span>Viability:</span>
                        <Badge className={getViabilityColor(results.analysis.projectViability)}>
                          {results.analysis.projectViability.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Viability Score:</span>
                        <span className="font-semibold">{results.analysis.viabilityScore}/100</span>
                      </div>
                      <Progress value={results.analysis.viabilityScore} className="w-full" />
                      
                      <Separator />
                      
                      <div>
                        <h4 className="font-semibold mb-2">Key Strengths:</h4>
                        <ul className="text-sm space-y-1">
                          {results.analysis.keyStrengths.map((strength, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-green-600">✓</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Key Risks:</h4>
                        <ul className="text-sm space-y-1">
                          {results.analysis.keyRisks.map((risk, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-red-600">⚠</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Assessment */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Risk Assessment</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span>Overall Risk:</span>
                        <Badge className={getRiskColor(results.analysis.riskAssessment.overallRisk)}>
                          {results.analysis.riskAssessment.overallRisk.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Construction Risk:</span>
                          <Badge className={getRiskColor(results.analysis.riskAssessment.constructionRisk.level)}>
                            {results.analysis.riskAssessment.constructionRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Market Risk:</span>
                          <Badge className={getRiskColor(results.analysis.riskAssessment.marketRisk.level)}>
                            {results.analysis.riskAssessment.marketRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Financing Risk:</span>
                          <Badge className={getRiskColor(results.analysis.riskAssessment.financingRisk.level)}>
                            {results.analysis.riskAssessment.financingRisk.level.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Break-Even Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Break-Even Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Break-Even Occupancy:</span>
                        <span className="font-semibold">{formatPercentage(results.breakEvenAnalysis.breakEvenOccupancy)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break-Even Rent:</span>
                        <span className="font-semibold">{formatCurrency(results.breakEvenAnalysis.breakEvenRent)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Break-Even Timeline:</span>
                        <span className="font-semibold">{formatDecimal(results.breakEvenAnalysis.breakEvenTimeline)} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Margin of Safety:</span>
                        <span className="font-semibold">{formatPercentage(results.breakEvenAnalysis.marginOfSafety)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    Click "Calculate Pro-Forma" to see results.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* Financial Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Financial Summary</h4>
                        <p className="text-sm text-gray-600">{results.analysis.financialSummary}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Cash Flow Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.cashFlowAnalysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Return Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.returnAnalysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Risk Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.riskAnalysis}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Market Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Market Positioning</h4>
                        <p className="text-sm text-gray-600">{results.analysis.marketPositioning}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Competitive Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.competitiveAnalysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Demand Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.demandAnalysis}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">Supply Analysis</h4>
                        <p className="text-sm text-gray-600">{results.analysis.supplyAnalysis}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recommendations */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {results.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span className="text-sm">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    Click "Calculate Pro-Forma" to see analysis.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="projections" className="space-y-6">
              {results ? (
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
                              <th className="text-left p-2">Period</th>
                              <th className="text-right p-2">Construction Costs</th>
                              <th className="text-right p-2">Revenue</th>
                              <th className="text-right p-2">Operating Expenses</th>
                              <th className="text-right p-2">Debt Service</th>
                              <th className="text-right p-2">Cash Flow</th>
                              <th className="text-right p-2">Cumulative CF</th>
                              <th className="text-right p-2">Occupancy</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.cashFlowProjections.slice(0, 12).map((projection, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{projection.period}</td>
                                <td className="text-right p-2">{formatCurrency(projection.constructionCosts)}</td>
                                <td className="text-right p-2">{formatCurrency(projection.revenue)}</td>
                                <td className="text-right p-2">{formatCurrency(projection.operatingExpenses)}</td>
                                <td className="text-right p-2">{formatCurrency(projection.debtService)}</td>
                                <td className="text-right p-2">{formatCurrency(projection.cashFlow)}</td>
                                <td className="text-right p-2">{formatCurrency(projection.cumulativeCashFlow)}</td>
                                <td className="text-right p-2">{formatPercentage(projection.occupancy)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Investment Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Investment:</span>
                        <span className="font-semibold">{formatCurrency(results.investmentSummary.totalInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expected Return:</span>
                        <span className="font-semibold">{formatPercentage(results.investmentSummary.expectedReturn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Timeline:</span>
                        <span className="font-semibold">{results.investmentSummary.timeline} years</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Risk Level:</span>
                        <Badge className={getRiskColor(results.investmentSummary.riskLevel)}>
                          {results.investmentSummary.riskLevel.toUpperCase()}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <p className="text-sm text-gray-600">{results.investmentSummary.summary}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    Click "Calculate Pro-Forma" to see projections.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>

            <TabsContent value="scenarios" className="space-y-6">
              {results ? (
                <div className="space-y-6">
                  {/* Sensitivity Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Sensitivity Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Scenario</th>
                              <th className="text-right p-2">NPV</th>
                              <th className="text-right p-2">IRR</th>
                              <th className="text-right p-2">Profit Margin</th>
                              <th className="text-right p-2">Break-Even Occupancy</th>
                              <th className="text-center p-2">Impact</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.sensitivityResults.map((result, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{result.scenario}</td>
                                <td className="text-right p-2">{formatCurrency(result.npv)}</td>
                                <td className="text-right p-2">{formatPercentage(result.irr)}</td>
                                <td className="text-right p-2">{formatPercentage(result.profitMargin)}</td>
                                <td className="text-right p-2">{formatPercentage(result.breakEvenOccupancy)}</td>
                                <td className="text-center p-2">
                                  <Badge 
                                    className={
                                      result.impact === 'positive' ? 'bg-green-100 text-green-800' :
                                      result.impact === 'negative' ? 'bg-red-100 text-red-800' :
                                      'bg-gray-100 text-gray-800'
                                    }
                                  >
                                    {result.impact.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Stress Tests */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Stress Tests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Test</th>
                              <th className="text-right p-2">NPV</th>
                              <th className="text-right p-2">IRR</th>
                              <th className="text-right p-2">Cash Flow</th>
                              <th className="text-center p-2">Survivability</th>
                            </tr>
                          </thead>
                          <tbody>
                            {results.stressTestResults.map((result, index) => (
                              <tr key={index} className="border-b">
                                <td className="p-2">{result.test}</td>
                                <td className="text-right p-2">{formatCurrency(result.npv)}</td>
                                <td className="text-right p-2">{formatPercentage(result.irr)}</td>
                                <td className="text-right p-2">{formatCurrency(result.cashFlow)}</td>
                                <td className="text-center p-2">
                                  <Badge className={getRiskColor(result.survivability)}>
                                    {result.survivability.toUpperCase()}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    Click "Calculate Pro-Forma" to see scenarios.
                  </AlertDescription>
                </Alert>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}