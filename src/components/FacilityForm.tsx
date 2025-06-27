import React, { useState } from 'react';
import { Building2, MapPin, Zap, Calendar, Users } from 'lucide-react';
import { FacilityData } from '../types';

interface FacilityFormProps {
  onSubmit: (data: FacilityData) => void;
}

const FacilityForm: React.FC<FacilityFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Partial<FacilityData>>({
    hasExistingEMIS: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      onSubmit(formData as FacilityData);
    }
  };

  const isFormValid = () => {
    return formData.name && formData.type && formData.location && 
           formData.size && formData.energyConsumption && 
           formData.primaryEnergySource && formData.buildingAge && 
           formData.occupancy;
  };

  const facilityTypes = [
    'Office Building',
    'Manufacturing Facility',
    'Warehouse',
    'Retail Store',
    'Hospital',
    'School',
    'Hotel',
    'Data Center',
    'Other'
  ];

  const energySources = [
    'Electricity',
    'Natural Gas',
    'Oil',
    'Propane',
    'Steam',
    'Mixed Sources'
  ];

  const emisTypes = [
    'Building Automation System (BAS)',
    'Energy Management Software',
    'Smart Meters Only',
    'Manual Tracking',
    'Other'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <Building2 className="w-8 h-8 text-primary-600" />
          <div>
            <h2 className="text-2xl font-bold text-secondary-900">Facility Information</h2>
            <p className="text-secondary-600">Please provide details about your facility</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <label className="label">
                <Building2 className="w-4 h-4 inline mr-2" />
                Facility Name
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter facility name"
                required
              />
            </div>

            <div>
              <label className="label">Facility Type</label>
              <select
                className="input-field"
                value={formData.type || ''}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="">Select facility type</option>
                {facilityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <MapPin className="w-4 h-4 inline mr-2" />
                Location
              </label>
              <input
                type="text"
                className="input-field"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="City, Province"
                required
              />
            </div>

            <div>
              <label className="label">Floor Area (sq ft)</label>
              <input
                type="number"
                className="input-field"
                value={formData.size || ''}
                onChange={(e) => setFormData({ ...formData, size: Number(e.target.value) })}
                placeholder="Enter floor area"
                required
              />
            </div>

            <div>
              <label className="label">
                <Zap className="w-4 h-4 inline mr-2" />
                Annual Energy Consumption (kWh)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.energyConsumption || ''}
                onChange={(e) => setFormData({ ...formData, energyConsumption: Number(e.target.value) })}
                placeholder="Enter annual consumption"
                required
              />
            </div>

            <div>
              <label className="label">Primary Energy Source</label>
              <select
                className="input-field"
                value={formData.primaryEnergySource || ''}
                onChange={(e) => setFormData({ ...formData, primaryEnergySource: e.target.value })}
                required
              >
                <option value="">Select energy source</option>
                {energySources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">
                <Calendar className="w-4 h-4 inline mr-2" />
                Building Age (years)
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.buildingAge || ''}
                onChange={(e) => setFormData({ ...formData, buildingAge: Number(e.target.value) })}
                placeholder="Enter building age"
                required
              />
            </div>

            <div>
              <label className="label">
                <Users className="w-4 h-4 inline mr-2" />
                Typical Occupancy
              </label>
              <input
                type="number"
                className="input-field"
                value={formData.occupancy || ''}
                onChange={(e) => setFormData({ ...formData, occupancy: Number(e.target.value) })}
                placeholder="Number of occupants"
                required
              />
            </div>
          </div>

          {/* EMIS Information */}
          <div className="border-t border-secondary-200 pt-6">
            <h3 className="text-lg font-semibold text-secondary-900 mb-4">
              Existing Energy Management Information System (EMIS)
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasEMIS"
                    checked={formData.hasExistingEMIS === true}
                    onChange={() => setFormData({ ...formData, hasExistingEMIS: true })}
                    className="mr-2"
                  />
                  Yes, we have an existing EMIS
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="hasEMIS"
                    checked={formData.hasExistingEMIS === false}
                    onChange={() => setFormData({ ...formData, hasExistingEMIS: false, existingEMISType: undefined })}
                    className="mr-2"
                  />
                  No, we don't have an EMIS
                </label>
              </div>

              {formData.hasExistingEMIS && (
                <div>
                  <label className="label">Type of Existing EMIS</label>
                  <select
                    className="input-field"
                    value={formData.existingEMISType || ''}
                    onChange={(e) => setFormData({ ...formData, existingEMISType: e.target.value })}
                  >
                    <option value="">Select EMIS type</option>
                    {emisTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={!isFormValid()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Scoring
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FacilityForm;