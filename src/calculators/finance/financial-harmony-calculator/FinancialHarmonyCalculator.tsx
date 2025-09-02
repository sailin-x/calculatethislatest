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
import { calculateFinancialHarmony, validateFinancialHarmonyInputs, validateFinancialHarmonyOutputs } from './formulas';
import { validateField } from './quickValidation';
import { FinancialHarmonyInputs, FinancialHarmonyOutputs, HarmonyMetric, HarmonyAnalysis, HarmonyInsight, HarmonyRecommendation } from './types';

export default function FinancialHarmonyCalculator() {
  const [inputs, setInputs] = useState<FinancialHarmonyInputs>({
    currentIncome: 75000,
    currentSavings: 25000,
    currentInvestments: 15000,
    currentDebt: 5000,
    age: 30,
    maritalStatus: 'single',
    dependents: 0,
    education: 'bachelors',
    jobSatisfaction: 7,
    workLifeBalance: 7,
    careerGrowth: 7,
    financialStress: 4,
    lifeSatisfaction: 7,
    socialConnections: 7,
    healthStatus: 'good',
    personalGoals: ['career_advancement', 'financial_security', 'work_life_balance'],
    goalPriorities: {
      career_advancement: 1,
      financial_security: 2,
      work_life_balance: 3,
      personal_development: 4,
      relationships: 5,
      health_wellness: 6,
      community_contribution: 7
    },
    currentLifestyle: {
      housing: 'comfortable',
      transportation: 'reliable',
      entertainment: 'moderate',
      dining: 'moderate',
      travel: 'occasional',
      shopping: 'moderate',
      health_care: 'adequate'
    },
    financialValues: {
      security: 8,
      freedom: 7,
      growth: 6,
      stability: 8,
      flexibility: 6,
      legacy: 5,
      experiences: 7
    },
    lifeCircumstances: 'stable',
    supportNetwork: 'strong',
    personalGrowth: 'active',
    spiritualWellness: 7,
    emotionalBalance: 7,
    mentalClarity: 7,
    physicalEnergy: 7,
    relationshipHarmony: 7,
    careerAlignment: 7,
    financialFlow: 7
  });

  const [outputs, setOutputs] = useState<FinancialHarmonyOutputs | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [warnings, setWarnings] = useState<Record<string, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: keyof FinancialHarmonyInputs, value: any) => {
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
      const inputValidation = validateFinancialHarmonyInputs(inputs);
      if (!inputValidation.isValid) {
        setErrors(inputValidation.errors || {});
        return;
      }

      // Calculate results
      const results = calculateFinancialHarmony(inputs);

      // Validate outputs
      const outputValidation = validateFinancialHarmonyOutputs(results);
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

  const getHarmonyScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHarmonyScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-100 text-green-800">Harmonious</Badge>;
    if (score >= 60) return <Badge className="bg-yellow-100 text-yellow-800">Balanced</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Alignment</Badge>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Harmony Calculator</h1>
        <p className="text-muted-foreground">
          Assess your financial harmony and discover paths to greater balance and alignment
        </p>
      </div>

      <Tabs defaultValue="inputs" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial & Life Harmony Assessment</CardTitle>
              <CardDescription>
                Enter your current circumstances to assess financial harmony and life balance
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
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={inputs.maritalStatus}
                    onValueChange={(value) => handleInputChange('maritalStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                      <SelectItem value="partnered">Partnered</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.maritalStatus && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.maritalStatus}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    type="number"
                    value={inputs.dependents}
                    onChange={(e) => handleInputChange('dependents', parseInt(e.target.value))}
                    placeholder="0"
                  />
                  {errors.dependents && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.dependents}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    value={inputs.education}
                    onValueChange={(value) => handleInputChange('education', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high_school">High School</SelectItem>
                      <SelectItem value="some_college">Some College</SelectItem>
                      <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                      <SelectItem value="masters">Master's Degree</SelectItem>
                      <SelectItem value="doctorate">Doctorate</SelectItem>
                      <SelectItem value="trade_school">Trade School</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.education && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.education}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobSatisfaction">Job Satisfaction (1-10)</Label>
                  <Input
                    id="jobSatisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.jobSatisfaction}
                    onChange={(e) => handleInputChange('jobSatisfaction', parseInt(e.target.value))}
                    placeholder="7"
                  />
                  {errors.jobSatisfaction && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.jobSatisfaction}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="workLifeBalance">Work-Life Balance (1-10)</Label>
                  <Input
                    id="workLifeBalance"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.workLifeBalance}
                    onChange={(e) => handleInputChange('workLifeBalance', parseInt(e.target.value))}
                    placeholder="7"
                  />
                  {errors.workLifeBalance && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.workLifeBalance}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="careerGrowth">Career Growth Potential (1-10)</Label>
                  <Input
                    id="careerGrowth"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.careerGrowth}
                    onChange={(e) => handleInputChange('careerGrowth', parseInt(e.target.value))}
                    placeholder="7"
                  />
                  {errors.careerGrowth && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.careerGrowth}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financialStress">Financial Stress Level (1-10)</Label>
                  <Input
                    id="financialStress"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.financialStress}
                    onChange={(e) => handleInputChange('financialStress', parseInt(e.target.value))}
                    placeholder="4"
                  />
                  {errors.financialStress && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.financialStress}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lifeSatisfaction">Overall Life Satisfaction (1-10)</Label>
                  <Input
                    id="lifeSatisfaction"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.lifeSatisfaction}
                    onChange={(e) => handleInputChange('lifeSatisfaction', parseInt(e.target.value))}
                    placeholder="7"
                  />
                  {errors.lifeSatisfaction && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.lifeSatisfaction}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="socialConnections">Social Connections Quality (1-10)</Label>
                  <Input
                    id="socialConnections"
                    type="number"
                    min="1"
                    max="10"
                    value={inputs.socialConnections}
                    onChange={(e) => handleInputChange('socialConnections', parseInt(e.target.value))}
                    placeholder="7"
                  />
                  {errors.socialConnections && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.socialConnections}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="healthStatus">Health Status</Label>
                  <Select
                    value={inputs.healthStatus}
                    onValueChange={(value) => handleInputChange('healthStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="very_good">Very Good</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.healthStatus && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.healthStatus}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Harmony & Wellness Assessment (1-10 scale)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="spiritualWellness">Spiritual Wellness</Label>
                    <Input
                      id="spiritualWellness"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.spiritualWellness}
                      onChange={(e) => handleInputChange('spiritualWellness', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emotionalBalance">Emotional Balance</Label>
                    <Input
                      id="emotionalBalance"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.emotionalBalance}
                      onChange={(e) => handleInputChange('emotionalBalance', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mentalClarity">Mental Clarity</Label>
                    <Input
                      id="mentalClarity"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.mentalClarity}
                      onChange={(e) => handleInputChange('mentalClarity', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="physicalEnergy">Physical Energy</Label>
                    <Input
                      id="physicalEnergy"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.physicalEnergy}
                      onChange={(e) => handleInputChange('physicalEnergy', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relationshipHarmony">Relationship Harmony</Label>
                    <Input
                      id="relationshipHarmony"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.relationshipHarmony}
                      onChange={(e) => handleInputChange('relationshipHarmony', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="careerAlignment">Career Alignment</Label>
                    <Input
                      id="careerAlignment"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.careerAlignment}
                      onChange={(e) => handleInputChange('careerAlignment', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="financialFlow">Financial Flow</Label>
                    <Input
                      id="financialFlow"
                      type="number"
                      min="1"
                      max="10"
                      value={inputs.financialFlow}
                      onChange={(e) => handleInputChange('financialFlow', parseInt(e.target.value))}
                      placeholder="7"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Personal Goals (select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['career_advancement', 'financial_security', 'work_life_balance', 'personal_development', 'relationships', 'health_wellness', 'community_contribution'].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={goal}
                        checked={inputs.personalGoals.includes(goal as any)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            handleInputChange('personalGoals', [...inputs.personalGoals, goal]);
                          } else {
                            handleInputChange('personalGoals', inputs.personalGoals.filter(g => g !== goal));
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
                <Label>Current Lifestyle Assessment</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(inputs.currentLifestyle).map(([aspect, level]) => (
                    <div key={aspect} className="space-y-2">
                      <Label className="text-sm capitalize">{aspect.replace('_', ' ')}</Label>
                      <Select
                        value={level}
                        onValueChange={(value) => handleInputChange('currentLifestyle', {
                          ...inputs.currentLifestyle,
                          [aspect]: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="luxury">Luxury</SelectItem>
                          <SelectItem value="comfortable">Comfortable</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label>Financial Values (1-10 scale)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(inputs.financialValues).map(([value, importance]) => (
                    <div key={value} className="space-y-2">
                      <Label className="text-sm capitalize">{value.replace('_', ' ')}</Label>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        value={importance}
                        onChange={(e) => handleInputChange('financialValues', {
                          ...inputs.financialValues,
                          [value]: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="lifeCircumstances">Life Circumstances</Label>
                  <Select
                    value={inputs.lifeCircumstances}
                    onValueChange={(value) => handleInputChange('lifeCircumstances', value)}
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
                  {errors.lifeCircumstances && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.lifeCircumstances}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportNetwork">Support Network Quality</Label>
                  <Select
                    value={inputs.supportNetwork}
                    onValueChange={(value) => handleInputChange('supportNetwork', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_strong">Very Strong</SelectItem>
                      <SelectItem value="strong">Strong</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="weak">Weak</SelectItem>
                      <SelectItem value="very_weak">Very Weak</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.supportNetwork && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.supportNetwork}</AlertDescription>
                    </Alert>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="personalGrowth">Personal Growth Activity</Label>
                  <Select
                    value={inputs.personalGrowth}
                    onValueChange={(value) => handleInputChange('personalGrowth', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_active">Very Active</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="very_inactive">Very Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.personalGrowth && (
                    <Alert variant="destructive">
                      <AlertDescription>{errors.personalGrowth}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>

              <Button 
                onClick={handleCalculate} 
                disabled={isCalculating || Object.keys(errors).length > 0}
                className="w-full"
              >
                {isCalculating ? 'Calculating...' : 'Calculate Financial Harmony'}
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
                <p className="text-muted-foreground">Enter your information and click calculate to see results</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Harmony Score & Summary</CardTitle>
                  <CardDescription>
                    Your overall financial harmony and life balance indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="text-4xl font-bold">
                      <span className={getHarmonyScoreColor(outputs.harmonyScore)}>
                        {outputs.harmonyScore.toFixed(1)}
                      </span>
                      /100
                    </div>
                    {getHarmonyScoreBadge(outputs.harmonyScore)}
                    <p className="text-muted-foreground">
                      {outputs.harmonyScore >= 80 ? 'Excellent financial harmony!' :
                       outputs.harmonyScore >= 60 ? 'Good financial harmony with room for improvement' :
                       'Focus on key areas to improve your financial harmony'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-green-600">
                        {outputs.financialBalanceScore.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Financial Balance</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-blue-600">
                        {outputs.lifeBalanceScore.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Life Balance</div>
                    </div>
                    <div className="text-center space-y-2">
                      <div className="text-2xl font-bold text-purple-600">
                        {outputs.alignmentScore.toFixed(1)}
                      </div>
                      <div className="text-sm text-muted-foreground">Value Alignment</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Harmony Metrics</CardTitle>
                  <CardDescription>
                    Detailed breakdown of your harmony indicators
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(outputs.harmonyMetrics).map(([metric, value]) => (
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
                  <CardTitle>Harmony Analysis</CardTitle>
                  <CardDescription>
                    Comprehensive analysis of your financial harmony factors
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Strengths</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {outputs.harmonyAnalysis.strengths.map((strength, index) => (
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
                      {outputs.harmonyAnalysis.areasForImprovement.map((area, index) => (
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
                      {outputs.harmonyAnalysis.riskFactors.map((risk, index) => (
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

        <TabsContent value="insights" className="space-y-6">
          {!outputs ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Calculate results to see insights</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>
                    Important observations about your financial harmony
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {outputs.harmonyInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="font-medium text-blue-800">{insight.title}</div>
                      <div className="text-sm text-blue-600 mt-1">{insight.description}</div>
                      <div className="text-xs text-blue-500 mt-2">Category: {insight.category}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          {!outputs ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">Calculate results to see recommendations</p>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Actionable Recommendations</CardTitle>
                  <CardDescription>
                    Specific steps to improve your financial harmony
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {outputs.harmonyRecommendations.map((recommendation, index) => (
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