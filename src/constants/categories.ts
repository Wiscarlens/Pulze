/**
 * Question categories for the quiz
 */

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string; // icon name from MaterialCommunityIcons
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'road_signs',
    name: 'Road Signs',
    description: 'Regulatory, warning, guide, and construction signs',
    icon: 'sign-direction',
    color: '#E53935',
  },
  {
    id: 'traffic_signals',
    name: 'Traffic Signals',
    description: 'Traffic lights, flashing signals, pedestrian signals',
    icon: 'traffic-light',
    color: '#43A047',
  },
  {
    id: 'right_of_way',
    name: 'Right of Way',
    description: 'Intersections, pedestrians, emergency vehicles',
    icon: 'arrow-decision',
    color: '#1E88E5',
  },
  {
    id: 'parking_rules',
    name: 'Parking Rules',
    description: 'Parallel parking, curb colors, no parking zones',
    icon: 'car-brake-parking',
    color: '#8E24AA',
  },
  {
    id: 'safe_driving',
    name: 'Safe Driving',
    description: 'Following distance, speed limits, lane changes',
    icon: 'shield-car',
    color: '#00ACC1',
  },
  {
    id: 'alcohol_drugs',
    name: 'Alcohol & Drugs',
    description: 'DUI laws, BAC limits, penalties, implied consent',
    icon: 'glass-wine',
    color: '#F4511E',
  },
  {
    id: 'special_situations',
    name: 'Special Situations',
    description: 'School zones, railroad crossings, emergency vehicles',
    icon: 'alert-octagon',
    color: '#FDD835',
  },
  {
    id: 'vehicle_equipment',
    name: 'Vehicle Equipment',
    description: 'Lights, mirrors, horn, brakes, safety equipment',
    icon: 'car-cog',
    color: '#6D4C41',
  },
  {
    id: 'road_markings',
    name: 'Road Markings',
    description: 'Lane lines, crosswalks, turn arrows, bike lanes',
    icon: 'road-variant',
    color: '#757575',
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};
