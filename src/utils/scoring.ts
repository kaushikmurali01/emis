import { ScoringCriteria, ScoreEntry, CategoryScore, ScoringResults, Recommendation, FacilityData } from '../types';

export const getScoringCriteria = (hasExistingEMIS: boolean): ScoringCriteria[] => {
  return [
    // Data Collection & Monitoring
    {
      id: 'dc1',
      category: 'DataCollection',
      subcategory: 'Energy Meter Coverage',
      description: 'Percentage of energy consumption covered by automated meters',
      maxScore: 10,
      weight: 3,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'dc2',
      category: 'DataCollection',
      subcategory: 'Data Granularity',
      description: 'Frequency of data collection (hourly, daily, monthly)',
      maxScore: 8,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'dc3',
      category: 'DataCollection',
      subcategory: 'Sub-metering',
      description: 'Level of sub-metering for different systems/zones',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'dc4',
      category: 'DataCollection',
      subcategory: 'Environmental Sensors',
      description: 'Temperature, humidity, occupancy sensors integration',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    },

    // Data Management & Storage
    {
      id: 'dm1',
      category: 'DataManagement',
      subcategory: 'Data Storage',
      description: 'Centralized, secure data storage with backup systems',
      maxScore: 8,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'dm2',
      category: 'DataManagement',
      subcategory: 'Data Quality',
      description: 'Data validation, cleaning, and quality assurance processes',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'dm3',
      category: 'DataManagement',
      subcategory: 'Data Integration',
      description: 'Integration with other building systems (BAS, HVAC, lighting)',
      maxScore: 8,
      weight: 3,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'dm4',
      category: 'DataManagement',
      subcategory: 'Historical Data',
      description: 'Retention and accessibility of historical energy data',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    },

    // Analytics & Reporting
    {
      id: 'ar1',
      category: 'Analytics',
      subcategory: 'Energy Benchmarking',
      description: 'Comparison against industry standards and historical performance',
      maxScore: 8,
      weight: 3,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ar2',
      category: 'Analytics',
      subcategory: 'Trend Analysis',
      description: 'Identification of energy consumption patterns and trends',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ar3',
      category: 'Analytics',
      subcategory: 'Anomaly Detection',
      description: 'Automated detection of unusual energy consumption patterns',
      maxScore: 8,
      weight: 3,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ar4',
      category: 'Analytics',
      subcategory: 'Predictive Analytics',
      description: 'Forecasting and predictive maintenance capabilities',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ar5',
      category: 'Analytics',
      subcategory: 'Custom Reporting',
      description: 'Flexible, customizable reporting capabilities',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    },

    // User Interface & Accessibility
    {
      id: 'ui1',
      category: 'UserInterface',
      subcategory: 'Dashboard Design',
      description: 'Intuitive, user-friendly dashboard with key metrics',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ui2',
      category: 'UserInterface',
      subcategory: 'Mobile Access',
      description: 'Mobile-responsive interface or dedicated mobile app',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ui3',
      category: 'UserInterface',
      subcategory: 'Role-based Access',
      description: 'Different access levels for different user types',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ui4',
      category: 'UserInterface',
      subcategory: 'Visualization Tools',
      description: 'Charts, graphs, and visual representation of data',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },

    // Control & Automation
    {
      id: 'ca1',
      category: 'Control',
      subcategory: 'Automated Controls',
      description: 'Automated control of building systems based on energy data',
      maxScore: 10,
      weight: 3,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ca2',
      category: 'Control',
      subcategory: 'Demand Response',
      description: 'Capability to participate in demand response programs',
      maxScore: 8,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ca3',
      category: 'Control',
      subcategory: 'Load Scheduling',
      description: 'Optimization of equipment operation schedules',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ca4',
      category: 'Control',
      subcategory: 'Setpoint Optimization',
      description: 'Dynamic optimization of temperature and other setpoints',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },

    // Maintenance & Support
    {
      id: 'ms1',
      category: 'Maintenance',
      subcategory: 'System Reliability',
      description: 'System uptime and reliability metrics',
      maxScore: 8,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ms2',
      category: 'Maintenance',
      subcategory: 'Technical Support',
      description: 'Availability and quality of technical support',
      maxScore: 6,
      weight: 2,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ms3',
      category: 'Maintenance',
      subcategory: 'Training & Documentation',
      description: 'User training and comprehensive documentation',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    },
    {
      id: 'ms4',
      category: 'Maintenance',
      subcategory: 'System Updates',
      description: 'Regular software updates and feature enhancements',
      maxScore: 4,
      weight: 1,
      applicableToExisting: true,
      applicableToNew: true
    }
  ];
};

export const calculateResults = (criteria: ScoringCriteria[], scoreEntries: ScoreEntry[]): Omit<ScoringResults, 'recommendations' | 'scoreEntries'> => {
  const categories = [...new Set(criteria.map(c => c.category))];
  const categoryScores: CategoryScore[] = [];
  
  let totalWeightedScore = 0;
  let totalMaxWeightedScore = 0;

  categories.forEach(category => {
    const categoryCriteria = criteria.filter(c => c.category === category);
    let categoryScore = 0;
    let categoryMaxScore = 0;
    let categoryWeightedScore = 0;
    let categoryMaxWeightedScore = 0;

    categoryCriteria.forEach(criterion => {
      const scoreEntry = scoreEntries.find(entry => entry.criteriaId === criterion.id);
      const score = scoreEntry ? scoreEntry.score : 0;
      
      categoryScore += score;
      categoryMaxScore += criterion.maxScore;
      
      const weightedScore = score * criterion.weight;
      const maxWeightedScore = criterion.maxScore * criterion.weight;
      
      categoryWeightedScore += weightedScore;
      categoryMaxWeightedScore += maxWeightedScore;
    });

    const percentage = categoryMaxScore > 0 ? (categoryScore / categoryMaxScore) * 100 : 0;
    
    categoryScores.push({
      category,
      score: categoryScore,
      maxScore: categoryMaxScore,
      percentage,
      weight: categoryMaxWeightedScore / categoryMaxScore, // Average weight for category
      weightedScore: categoryWeightedScore
    });

    totalWeightedScore += categoryWeightedScore;
    totalMaxWeightedScore += categoryMaxWeightedScore;
  });

  const overallPercentage = totalMaxWeightedScore > 0 ? (totalWeightedScore / totalMaxWeightedScore) * 100 : 0;

  return {
    totalScore: Math.round(totalWeightedScore),
    maxTotalScore: totalMaxWeightedScore,
    overallPercentage,
    categoryScores
  };
};

export const generateRecommendations = (results: Omit<ScoringResults, 'recommendations' | 'scoreEntries'>, facilityData: FacilityData): Recommendation[] => {
  const recommendations: Recommendation[] = [];

  // Analyze each category and generate recommendations
  results.categoryScores.forEach(category => {
    if (category.percentage < 60) {
      switch (category.category) {
        case 'DataCollection':
          recommendations.push({
            priority: 'High',
            category: 'Data Collection',
            title: 'Improve Energy Monitoring Infrastructure',
            description: 'Install additional smart meters and sensors to increase coverage of energy consumption monitoring. Focus on sub-metering critical systems.',
            estimatedCost: '$15,000 - $50,000',
            timeframe: '3-6 months',
            expectedBenefit: '15-25% improvement in energy visibility'
          });
          break;

        case 'DataManagement':
          recommendations.push({
            priority: 'High',
            category: 'Data Management',
            title: 'Implement Centralized Data Management System',
            description: 'Deploy a robust data management platform with automated data validation, backup systems, and integration capabilities.',
            estimatedCost: '$25,000 - $75,000',
            timeframe: '4-8 months',
            expectedBenefit: 'Improved data quality and system reliability'
          });
          break;

        case 'Analytics':
          recommendations.push({
            priority: 'Medium',
            category: 'Analytics',
            title: 'Deploy Advanced Analytics Tools',
            description: 'Implement predictive analytics, anomaly detection, and automated benchmarking to identify energy saving opportunities.',
            estimatedCost: '$20,000 - $60,000',
            timeframe: '2-4 months',
            expectedBenefit: '10-20% energy cost reduction'
          });
          break;

        case 'UserInterface':
          recommendations.push({
            priority: 'Medium',
            category: 'User Interface',
            title: 'Enhance User Experience',
            description: 'Develop intuitive dashboards, mobile access, and role-based interfaces to improve user adoption and engagement.',
            estimatedCost: '$10,000 - $30,000',
            timeframe: '2-3 months',
            expectedBenefit: 'Increased user engagement and faster decision-making'
          });
          break;

        case 'Control':
          recommendations.push({
            priority: 'High',
            category: 'Control & Automation',
            title: 'Implement Automated Control Systems',
            description: 'Deploy automated controls for HVAC, lighting, and other systems based on occupancy and energy demand patterns.',
            estimatedCost: '$30,000 - $100,000',
            timeframe: '6-12 months',
            expectedBenefit: '20-30% energy cost reduction'
          });
          break;

        case 'Maintenance':
          recommendations.push({
            priority: 'Low',
            category: 'Maintenance',
            title: 'Establish Maintenance Protocols',
            description: 'Develop comprehensive maintenance schedules, user training programs, and technical support procedures.',
            estimatedCost: '$5,000 - $15,000',
            timeframe: '1-2 months',
            expectedBenefit: 'Improved system reliability and user competency'
          });
          break;
      }
    }
  });

  // Add facility-specific recommendations
  if (!facilityData.hasExistingEMIS) {
    recommendations.unshift({
      priority: 'High',
      category: 'Implementation',
      title: 'EMIS Implementation Strategy',
      description: 'Develop a phased approach to EMIS implementation starting with critical energy monitoring points and expanding systematically.',
      estimatedCost: '$50,000 - $200,000',
      timeframe: '12-18 months',
      expectedBenefit: 'Complete energy management capability'
    });
  }

  // Add recommendations based on facility characteristics
  if (facilityData.buildingAge > 20) {
    recommendations.push({
      priority: 'Medium',
      category: 'Infrastructure',
      title: 'Legacy System Integration',
      description: 'Upgrade older building systems to enable better integration with modern EMIS platforms.',
      estimatedCost: '$20,000 - $80,000',
      timeframe: '6-9 months',
      expectedBenefit: 'Enhanced system compatibility and performance'
    });
  }

  if (facilityData.size > 100000) {
    recommendations.push({
      priority: 'Medium',
      category: 'Scalability',
      title: 'Enterprise-Scale EMIS Solution',
      description: 'Implement scalable EMIS architecture to handle large facility energy management requirements.',
      estimatedCost: '$75,000 - $250,000',
      timeframe: '9-15 months',
      expectedBenefit: 'Comprehensive energy management for large facilities'
    });
  }

  return recommendations.slice(0, 8); // Limit to top 8 recommendations
};