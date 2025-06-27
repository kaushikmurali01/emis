import React from 'react';
import { BarChart3, Download, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FacilityData, ScoringResults } from '../types';

interface ResultsDisplayProps {
  facilityData: FacilityData;
  results: ScoringResults;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ facilityData, results }) => {
  const radarData = results.categoryScores.map(cat => ({
    category: cat.category.replace(/([A-Z])/g, ' $1').trim(),
    score: cat.percentage,
    fullMark: 100
  }));

  const barData = results.categoryScores.map(cat => ({
    category: cat.category.replace(/([A-Z])/g, ' $1').trim(),
    score: cat.score,
    maxScore: cat.maxScore,
    percentage: cat.percentage
  }));

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (percentage >= 60) return { label: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    if (percentage >= 40) return { label: 'Fair', color: 'bg-orange-100 text-orange-800' };
    return { label: 'Needs Improvement', color: 'bg-red-100 text-red-800' };
  };

  const overallBadge = getScoreBadge(results.overallPercentage);

  const priorityIcons = {
    High: AlertTriangle,
    Medium: Clock,
    Low: CheckCircle
  };

  const priorityColors = {
    High: 'text-red-600 bg-red-50 border-red-200',
    Medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    Low: 'text-green-600 bg-green-50 border-green-200'
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Overall Score Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">Assessment Results</h2>
              <p className="text-secondary-600">{facilityData.name}</p>
            </div>
          </div>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(results.overallPercentage)}`}>
              {results.overallPercentage.toFixed(1)}%
            </div>
            <div className="text-secondary-600 text-sm">Overall Score</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${overallBadge.color}`}>
              {overallBadge.label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-secondary-900">
              {results.totalScore}
            </div>
            <div className="text-secondary-600 text-sm">Total Points</div>
            <div className="text-xs text-secondary-500 mt-1">
              out of {results.maxTotalScore}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600">
              {results.recommendations.filter(r => r.priority === 'High').length}
            </div>
            <div className="text-secondary-600 text-sm">High Priority</div>
            <div className="text-xs text-secondary-500 mt-1">
              Recommendations
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Performance by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10 }}
                tickCount={6}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#0ea5e9"
                fill="#0ea5e9"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-secondary-900 mb-4">Detailed Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis dataKey="category" type="category" width={100} tick={{ fontSize: 11 }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'percentage' ? `${value}%` : value,
                  name === 'percentage' ? 'Percentage' : 'Score'
                ]}
              />
              <Bar dataKey="percentage" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card">
        <h3 className="text-lg font-semibold text-secondary-900 mb-4">Category Breakdown</h3>
        <div className="space-y-4">
          {results.categoryScores.map(category => (
            <div key={category.category} className="border border-secondary-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-secondary-900">
                  {category.category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-secondary-600">
                    {category.score} / {category.maxScore} points
                  </span>
                  <span className={`font-semibold ${getScoreColor(category.percentage)}`}>
                    {category.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-secondary-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-primary-600" />
          <h3 className="text-lg font-semibold text-secondary-900">Recommendations</h3>
        </div>
        
        <div className="space-y-4">
          {results.recommendations.map((rec, index) => {
            const PriorityIcon = priorityIcons[rec.priority];
            return (
              <div key={index} className={`border rounded-lg p-4 ${priorityColors[rec.priority]}`}>
                <div className="flex items-start space-x-3">
                  <PriorityIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <span className="text-xs font-medium px-2 py-1 rounded">
                        {rec.priority} Priority
                      </span>
                    </div>
                    <p className="text-sm mb-3">{rec.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div>
                        <span className="font-medium">Estimated Cost:</span>
                        <div>{rec.estimatedCost}</div>
                      </div>
                      <div>
                        <span className="font-medium">Timeframe:</span>
                        <div>{rec.timeframe}</div>
                      </div>
                      <div>
                        <span className="font-medium">Expected Benefit:</span>
                        <div>{rec.expectedBenefit}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;