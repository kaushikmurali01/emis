import React, { useState } from 'react';
import { FileText, Save, Calculator } from 'lucide-react';
import { FacilityData, ScoringResults, ScoreEntry, CategoryScore, Recommendation } from '../types';
import { getScoringCriteria, calculateResults, generateRecommendations } from '../utils/scoring';

interface ScoringSectionProps {
  facilityData: FacilityData;
  onComplete: (results: ScoringResults) => void;
}

const ScoringSection: React.FC<ScoringSectionProps> = ({ facilityData, onComplete }) => {
  const [scoreEntries, setScoreEntries] = useState<ScoreEntry[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('');

  const criteria = getScoringCriteria(facilityData.hasExistingEMIS);
  const categories = [...new Set(criteria.map(c => c.category))];

  React.useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const handleScoreChange = (criteriaId: string, score: number, notes?: string) => {
    setScoreEntries(prev => {
      const existing = prev.find(entry => entry.criteriaId === criteriaId);
      if (existing) {
        return prev.map(entry => 
          entry.criteriaId === criteriaId 
            ? { ...entry, score, notes }
            : entry
        );
      } else {
        return [...prev, { criteriaId, score, notes }];
      }
    });
  };

  const getScore = (criteriaId: string) => {
    return scoreEntries.find(entry => entry.criteriaId === criteriaId)?.score || 0;
  };

  const getNotes = (criteriaId: string) => {
    return scoreEntries.find(entry => entry.criteriaId === criteriaId)?.notes || '';
  };

  const calculateAndSubmit = () => {
    const results = calculateResults(criteria, scoreEntries);
    const recommendations = generateRecommendations(results, facilityData);
    
    const finalResults: ScoringResults = {
      ...results,
      recommendations,
      scoreEntries
    };

    onComplete(finalResults);
  };

  const isComplete = () => {
    const applicableCriteria = criteria.filter(c => 
      facilityData.hasExistingEMIS ? c.applicableToExisting : c.applicableToNew
    );
    return applicableCriteria.every(c => 
      scoreEntries.some(entry => entry.criteriaId === c.id)
    );
  };

  const activeCriteria = criteria.filter(c => 
    c.category === activeCategory && 
    (facilityData.hasExistingEMIS ? c.applicableToExisting : c.applicableToNew)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <FileText className="w-8 h-8 text-primary-600" />
            <div>
              <h2 className="text-2xl font-bold text-secondary-900">EMIS Scoring Assessment</h2>
              <p className="text-secondary-600">
                {facilityData.hasExistingEMIS 
                  ? 'Evaluate your existing EMIS against NRCan guidelines'
                  : 'Score potential EMIS implementation for your facility'
                }
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-secondary-600">Facility:</div>
            <div className="font-semibold text-secondary-900">{facilityData.name}</div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-b border-secondary-200 mb-6">
          <nav className="flex space-x-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeCategory === category
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>

        {/* Scoring Form */}
        <div className="space-y-6">
          {activeCriteria.map(criterion => (
            <div key={criterion.id} className="border border-secondary-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-secondary-900 mb-1">
                    {criterion.subcategory}
                  </h4>
                  <p className="text-secondary-600 text-sm mb-2">
                    {criterion.description}
                  </p>
                  <div className="text-xs text-secondary-500">
                    Weight: {criterion.weight}x | Max Score: {criterion.maxScore}
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <label className="label text-xs">Score (0-{criterion.maxScore})</label>
                  <input
                    type="number"
                    min="0"
                    max={criterion.maxScore}
                    value={getScore(criterion.id)}
                    onChange={(e) => handleScoreChange(
                      criterion.id, 
                      Number(e.target.value),
                      getNotes(criterion.id)
                    )}
                    className="input-field w-20 text-center"
                  />
                </div>
              </div>
              
              <div>
                <label className="label text-xs">Notes (optional)</label>
                <textarea
                  value={getNotes(criterion.id)}
                  onChange={(e) => handleScoreChange(
                    criterion.id,
                    getScore(criterion.id),
                    e.target.value
                  )}
                  className="input-field text-sm"
                  rows={2}
                  placeholder="Add any relevant notes or observations..."
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-secondary-200">
          <div className="text-sm text-secondary-600">
            Progress: {scoreEntries.length} of {criteria.filter(c => 
              facilityData.hasExistingEMIS ? c.applicableToExisting : c.applicableToNew
            ).length} criteria scored
          </div>
          <button
            onClick={calculateAndSubmit}
            disabled={!isComplete()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4" />
            <span>Calculate Results</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoringSection;