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
import { calculateFinancialGrowth, validateFinancialGrowthInputs, validateFinancialGrowthOutputs } from './formulas';
import { validateField } from './quickValidation';
import { FinancialGrowthInputs, FinancialGrowthOutputs, GrowthMetric, GrowthProjection, GrowthAnalysis, GrowthInsight, GrowthRecommendation } from './types';

export default function FinancialGrowthCalculator() {
  const [inputs, setInputs] = useState<FinancialGrowthInputs>({
    currentIncome: 75000,
    currentSavings: 25000,
    currentInvestments: 15000,
    currentDebt: 5000,
    age: 30,
    retirementAge: 65,
    lifeExpectancy: 85,
    incomeGrowthRate: 3.5,
    savingsRate: 20,
    investmentReturn: 7.5,
    debtInterestRate: 4.5,
    inflationRate: 2.5,
    riskTolerance: 'moderate',
    financialGoals: ['retirement', 'emergency_fund', 'debt_payoff'],
    goalPriorities: {
      retirement: 1,
      emergency_fund: 2,
      debt_payoff: 3,
      home_purchase: 4,
      education: 5,
      business_startup: 6,
      legacy_planning: 7
    },
    currentFinancialHabits: {
      budgeting: 'good',
      saving: 'good',
      investing: 'fair',
      debt_management: 'good',
      insurance: 'fair',
      tax_planning: 'fair',
      estate_planning: 'poor'
    },
    marketConditions: 'stable',
    economicOutlook: 'positive',
    personalCircumstances: 'stable'
  });

  const [outputs, setOutputs] = useState<FinancialGrowthOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof FinancialGrowthInputs, value: any) => {
    const newInputs = { ...inputs, [field]: value };
    setInputs(newInputs);

    // Clear previous errors/warnings for this field
    const newErrors = { ...errors };
    const newWarnings = { ...warnings };
    delete newErrors[field];
    delete newWarnings[field];

    // Perform quick validation
    const validation = validateField(field, value, newInputs);
    if (!validation.isValid && validation.error) {
      newErrors[field] = validation.error;
    } else if (validation.warning) {
      newWarnings[field] = validation.warning;
    }

    setErrors(newErrors);
    setWarnings(newWarnings);
  };

  const handleCalculate = async () => {
    setIsCalculating(true);
    setErrors({});
    setWarnings({});

    try {
      // Validate inputs
      const inputValidation = validateFinancialGrowthInputs(inputs);
      if (!inputValidation.isValid) {
        setErrors(inputValidation.errors || {});
        return;
      }

      // Calculate results
      const results = calculateFinancialGrowth(inputs);

      // Validate outputs
      const outputValidation = validateFinancialGrowthOutputs(results);
      if (!outputValidation.isValid) {
        setErrors(outputValidation.errors || {});
        return;
      }

      setOutputs(results);
    } catch (error) {
      setErrors({ calculation: 'An error occurred during calculation' });
    } finally {
      setIsCalculating(false);
    }
  };

  const getGrowthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGrowthScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Good</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Growth Calculator</h1>
        <p className="text-muted-foreground">
          Analyze your financial growth potential and create a roadmap for wealth building
        </p>
      </div>

      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Financial Situation</CardTitle>
              <CardDescription>
                Enter your current financial details to analyze growth potential
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="currentIncome">Current Annual Income ($)</Label>
                  <Input
                    id="currentIncome"
                    type="number"
                    value={inputs.currentIncome}
                    onChange={(e) => handleInputChange('currentIncome', parseFloat(e.target.value))}
                    placeholder="75000"
                  />
                  {errors.currentIncome && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.currentIncome}</AlertDescription>
                    </Alert>
                  )}
                  {warnings.currentIncome && (
                    <Alert>
                      <AlertDescription>{warnings.currentIncome}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={inputs.currentSavings}
                    onChange={(e) => handleInputChange('currentSavings', parseFloat(e.target.value))}
                    placeholder="25000"
                  />
                  {errors.currentSavings && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.currentSavings}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentInvestments">Current Investments ($)</Label>
                  <Input
                    id="currentInvestments"
                    type="number"
                    value={inputs.currentInvestments}
                    onChange={(e) => handleInputChange('currentInvestments', parseFloat(e.target.value))}
                    placeholder="15000"
                  />
                  {errors.currentInvestments && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.currentInvestments}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentDebt">Current Debt ($)</Label>
                  <Input
                    id="currentDebt"
                    type="number"
                    value={inputs.currentDebt}
                    onChange={(e) => handleInputChange('currentDebt', parseFloat(e.target.value))}
                    placeholder="5000"
                  />
                  {errors.currentDebt && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.currentDebt}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Current Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={inputs.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    placeholder="30"
                  />
                  {errors.age && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.age}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Planned Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    value={inputs.retirementAge}
                    onChange={(e) => handleInputChange('retirementAge', parseInt(e.target.value))}
                    placeholder="65"
                  />
                  {errors.retirementAge && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.retirementAge}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="incomeGrowthRate">Expected Income Growth Rate (%)</Label>
                  <Input
                    id="incomeGrowthRate"
                    type="number"
                    step="0.1"
                    value={inputs.incomeGrowthRate}
                    onChange={(e) => handleInputChange('incomeGrowthRate', parseFloat(e.target.value))}
                    placeholder="3.5"
                  />
                  {errors.incomeGrowthRate && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.incomeGrowthRate}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="savingsRate">Savings Rate (% of income)</Label>
                  <Input
                    id="savingsRate"
                    type="number"
                    step="0.1"
                    value={inputs.savingsRate}
                    onChange={(e) => handleInputChange('savingsRate', parseFloat(e.target.value))}
                    placeholder="20"
                  />
                  {errors.savingsRate && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.savingsRate}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="investmentReturn">Expected Investment Return (%)</Label>
                  <Input
                    id="investmentReturn"
                    type="number"
                    step="0.1"
                    value={inputs.investmentReturn}
                    onChange={(e) => handleInputChange('investmentReturn', parseFloat(e.target.value))}
                    placeholder="7.5"
                  />
                  {errors.investmentReturn && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.investmentReturn}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="debtInterestRate">Average Debt Interest Rate (%)</Label>
                  <Input
                    id="debtInterestRate"
                    type="number"
                    step="0.1"
                    value={inputs.debtInterestRate}
                    onChange={(e) => handleInputChange('debtInterestRate', parseFloat(e.target.value))}
                    placeholder="4.5"
                  />
                  {errors.debtInterestRate && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.debtInterestRate}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inflationRate">Expected Inflation Rate (%)</Label>
                  <Input
                    id="inflationRate"
                    type="number"
                    step="0.1"
                    value={inputs.inflationRate}
                    onChange={(e) => handleInputChange('inflationRate', parseFloat(e.target.value))}
                    placeholder="2.5"
                  />
                  {errors.inflationRate && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.inflationRate}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select
                    value={inputs.riskTolerance}
                    onValueChange={(value) => handleInputChange('riskTolerance', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.riskTolerance && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.riskTolerance}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Financial Goals (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['retirement', 'emergency_fund', 'debt_payoff', 'home_purchase', 'education', 'business_startup', 'legacy_planning'].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={inputs.financialGoals.includes(goal as any)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('financialGoals', [...inputs.financialGoals, goal]);
                          } else {
                            handleInputChange('financialGoals', inputs.financialGoals.filter(g => g !== goal));
                          }
                        }}
                      />
                      <Label htmlFor={goal} className="text-sm capitalize">
                        {goal.replace('_', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Current Financial Habits Assessment</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(inputs.currentFinancialHabits).map(([habit, level]) => (
                    <div key={habit} className="space-y-2">
                      <Label className="text-sm capitalize">{habit.replace('_', ' ')}</Label>
                      <Select
                        value={level}
                        onValueChange={(value) => handleInputChange('currentFinancialHabits', {
                          ...inputs.currentFinancialHabits,
                          [habit]: value
                        })}
                      >
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
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="marketConditions">Current Market Conditions</Label>
                  <Select
                    value={inputs.marketConditions}
                    onValueChange={(value) => handleInputChange('marketConditions', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bullish">Bullish</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="bearish">Bearish</SelectItem>
                      <SelectItem value="volatile">Volatile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="economicOutlook">Economic Outlook</Label>
                  <Select
                    value={inputs.economicOutlook}
                    onValueChange={(value) => handleInputChange('economicOutlook', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_positive">Very Positive</SelectItem>
                      <SelectItem value="positive">Positive</SelectItem>
                      <SelectItem value="neutral">Neutral</SelectItem>
                      <SelectItem value="negative">Negative</SelectItem>
                      <SelectItem value="very_negative">Very Negative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personalCircumstances">Personal Circumstances</Label>
                  <Select
                    value={inputs.personalCircumstances}
                    onValueChange={(value) => handleInputChange('personalCircumstances', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="improving">Improving</SelectItem>
                      <SelectItem value="stable">Stable</SelectItem>
                      <SelectItem value="challenging">Challenging</SelectItem>
                      <SelectItem value="uncertain">Uncertain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                onClick={handleCalculate} 
                disabled={isCalculating || Object.keys(errors).length > 0}
                className="w-full"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Financial Growth'}
              </Button>

              {errors.calculation && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.calculation}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          {!outputs ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Enter your financial information and click calculate to see results</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Growth Score & Summary</CardTitle>
                  <CardDescription>
                    Your overall financial growth potential and key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold">
                      <span className={getGrowthScoreColor(outputs.growthScore)}>
                        {outputs.growthScore.toFixed(1)}
                      </span>
                      /100
                    </div>
                    {getGrowthScoreBadge(outputs.growthScore)}
                    <p className="text-muted-foreground">
                      {outputs.growthScore >= 80 ? 'Excellent growth potential!' :
                       outputs.growthScore >= 60 ? 'Good growth potential with room for improvement' :
                       'Focus on key areas to improve growth potential'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        ${outputs.netWorth.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Current Net Worth</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-blue-600">
                        ${outputs.retirementSavings.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Projected Retirement Savings</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-purple-600">
                        {outputs.financialIndependenceAge} years
                      </div>
                      <div className="text-sm text-muted-foreground">Financial Independence Age</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your financial growth indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(outputs.growthMetrics).map(([metric, value]) => (
                      <div key={metric} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-sm capitalize">{metric.replace(/([A-Z])/g, ' $1').trim()}</Label>
                          <Badge variant="outline">{value.toFixed(2)}</Badge>
                        </div>
                        <Progress value={Math.min(value, 100)} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {!outputs ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Calculate results to see detailed analysis</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Growth Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive analysis of your financial growth factors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Strengths</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {outputs.growthAnalysis.strengths.map((strength, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="font-medium text-green-800">{strength.title}</div>
                          <div className="text-sm text-green-600 mt-1">{strength.description}</div>
                          <div className="text-xs text-green-500 mt-2">Impact: {strength.impact}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {outputs.growthAnalysis.areasForImprovement.map((area, index) => (
                        <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                          <div className="font-medium text-yellow-800">{area.title}</div>
                          <div className="text-sm text-yellow-600 mt-1">{area.description}</div>
                          <div className="text-xs text-yellow-500 mt-2">Priority: {area.priority}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Risk Factors</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {outputs.growthAnalysis.riskFactors.map((risk, index) => (
                        <div key={index} className="p-4 bg-red-50 rounded-lg border border-red-200">
                          <div className="font-medium text-red-800">{risk.title}</div>
                          <div className="text-sm text-red-600 mt-1">{risk.description}</div>
                          <div className="text-xs text-red-500 mt-2">Risk Level: {risk.riskLevel}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="projections" className="space-y-6">
          {!outputs ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Calculate results to see growth projections</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Growth Projections</CardTitle>
                  <CardDescription>
                    Long-term projections of your financial growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Net Worth Projections</h3>
                    <div className="space-y-3">
                      {outputs.growthProjections.netWorthProjections.map((projection, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium">{projection.year} years</div>
                          <div className="text-lg font-bold text-green-600">
                            ${projection.netWorth.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {projection.growthRate > 0 ? '+' : ''}{projection.growthRate.toFixed(1)}% growth
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Income Growth Projections</h3>
                    <div className="space-y-3">
                      {outputs.growthProjections.incomeProjections.map((projection, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <div className="text-sm font-medium">{projection.year} years</div>
                          <div className="text-lg font-bold text-blue-600">
                            ${projection.income.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {projection.cumulativeGrowth > 0 ? '+' : ''}{projection.cumulativeGrowth.toFixed(1)}% total growth
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Investment Growth Projections</h3>
                    <div className="space-y-3">
                      {outputs.growthProjections.investmentProjections.map((projection, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <div className="text-sm font-medium">{projection.year} years</div>
                          <div className="text-lg font-bold text-purple-600">
                            ${projection.investmentValue.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {projection.annualReturn > 0 ? '+' : ''}{projection.annualReturn.toFixed(1)}% return
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {!outputs ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Calculate results to see insights and recommendations</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>
                    Important observations about your financial growth potential
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {outputs.growthInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-medium text-blue-800">{insight.title}</div>
                      <div className="text-sm text-blue-600 mt-1">{insight.description}</div>
                      <div className="text-xs text-blue-500 mt-2">Category: {insight.category}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Actionable Recommendations</CardTitle>
                  <CardDescription>
                    Specific steps to improve your financial growth
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {outputs.growthRecommendations.map((recommendation, index) => (
                    <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="font-medium text-green-800">{recommendation.title}</div>
                      <div className="text-sm text-green-600 mt-1">{recommendation.description}</div>
                      <div className="text-xs text-green-500 mt-2">
                        Priority: {recommendation.priority} | Timeline: {recommendation.timeline}
                      </div>
                      <div className="mt-2">
                        <Label className="text-xs text-green-600">Implementation Steps:</Label>
                        <ul className="text-xs text-green-600 mt-1 list-disc list-inside">
                          {recommendation.implementationSteps.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}