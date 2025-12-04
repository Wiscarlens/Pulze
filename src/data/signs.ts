/**
 * Road Signs Database
 * Contains all road sign information for the reference section
 */

export type SignCategory = 'regulatory' | 'warning' | 'guide' | 'construction';

export interface RoadSign {
  id: string;
  name: string;
  category: SignCategory;
  imageUrl?: string;
  description: string;
  relatedQuestionIds: string[];
}

export const signs: RoadSign[] = [
  // Regulatory Signs
  {
    id: 'sign_stop',
    name: 'Stop Sign',
    category: 'regulatory',
    description: 'Come to a complete stop at the stop line, crosswalk, or before entering the intersection. Yield to pedestrians and other traffic. Proceed only when it is safe.',
    relatedQuestionIds: ['rs_001'],
  },
  {
    id: 'sign_yield',
    name: 'Yield Sign',
    category: 'regulatory',
    description: 'Slow down and be prepared to stop. Give the right-of-way to all vehicles and pedestrians in or approaching the intersection.',
    relatedQuestionIds: ['rs_002'],
  },
  {
    id: 'sign_speed_limit',
    name: 'Speed Limit Sign',
    category: 'regulatory',
    description: 'Indicates the maximum legal speed allowed on the road. You must not exceed this speed under any conditions, and you should drive slower when conditions are hazardous.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_do_not_enter',
    name: 'Do Not Enter',
    category: 'regulatory',
    description: 'You must not enter this roadway. This sign is usually placed at the exit end of one-way streets, ramps, and crossovers.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_wrong_way',
    name: 'Wrong Way',
    category: 'regulatory',
    description: 'You are traveling against traffic on a one-way street or ramp. Pull over safely and turn around.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_one_way',
    name: 'One Way',
    category: 'regulatory',
    description: 'Traffic flows only in the direction of the arrow. Do not go the opposite direction.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_no_turn_on_red',
    name: 'No Turn on Red',
    category: 'regulatory',
    description: 'You may not turn right (or left, if specified) on a red light at this intersection, even after stopping.',
    relatedQuestionIds: ['ts_005'],
  },
  {
    id: 'sign_no_u_turn',
    name: 'No U-Turn',
    category: 'regulatory',
    description: 'U-turns are prohibited at this location. Continue and find another legal place to turn around.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_no_parking',
    name: 'No Parking',
    category: 'regulatory',
    description: 'Parking is prohibited in this area. Check signs for specific times or conditions.',
    relatedQuestionIds: ['pr_002'],
  },
  {
    id: 'sign_no_passing',
    name: 'No Passing Zone',
    category: 'regulatory',
    description: 'Passing is prohibited in this area. Stay in your lane until you see a sign indicating passing is allowed.',
    relatedQuestionIds: ['rm_001'],
  },
  {
    id: 'sign_keep_right',
    name: 'Keep Right',
    category: 'regulatory',
    description: 'Stay to the right of the divider, island, or obstruction ahead.',
    relatedQuestionIds: [],
  },

  // Warning Signs
  {
    id: 'sign_curve_right',
    name: 'Curve Ahead (Right)',
    category: 'warning',
    description: 'The road ahead curves to the right. Slow down and maintain a safe speed through the curve.',
    relatedQuestionIds: ['sd_004'],
  },
  {
    id: 'sign_curve_left',
    name: 'Curve Ahead (Left)',
    category: 'warning',
    description: 'The road ahead curves to the left. Slow down and maintain a safe speed through the curve.',
    relatedQuestionIds: ['sd_004'],
  },
  {
    id: 'sign_winding_road',
    name: 'Winding Road',
    category: 'warning',
    description: 'The road ahead has a series of curves. Reduce speed and stay alert.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_merge',
    name: 'Merge',
    category: 'warning',
    description: 'Two lanes of traffic will merge into one ahead. Be prepared to yield or change lanes.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_lane_ends',
    name: 'Lane Ends',
    category: 'warning',
    description: 'The lane you are in will end ahead. Merge into the adjacent lane safely.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_divided_highway_begins',
    name: 'Divided Highway Begins',
    category: 'warning',
    description: 'The highway ahead is divided by a median. Keep to the right of the divider.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_divided_highway_ends',
    name: 'Divided Highway Ends',
    category: 'warning',
    description: 'The divided highway ends ahead. Traffic will meet from both directions. Stay alert.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_two_way_traffic',
    name: 'Two-Way Traffic',
    category: 'warning',
    description: 'You are leaving a one-way road and entering a road with two-way traffic.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_hill',
    name: 'Steep Grade/Hill',
    category: 'warning',
    description: 'There is a steep hill ahead. Trucks and heavy vehicles should use lower gears. Watch for slow-moving vehicles.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_slippery_when_wet',
    name: 'Slippery When Wet',
    category: 'warning',
    description: 'The road becomes slippery when wet. Reduce speed in wet conditions and avoid sudden braking or turning.',
    relatedQuestionIds: ['sd_006'],
  },
  {
    id: 'sign_railroad_crossing',
    name: 'Railroad Crossing Ahead',
    category: 'warning',
    description: 'A railroad crossing is ahead. Slow down, look both ways, and be prepared to stop. Never stop on the tracks.',
    relatedQuestionIds: ['rs_005', 'ss_002'],
  },
  {
    id: 'sign_deer_crossing',
    name: 'Deer Crossing',
    category: 'warning',
    description: 'Deer frequently cross the road in this area. Be alert, especially at dawn and dusk.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_pedestrian_crossing',
    name: 'Pedestrian Crossing',
    category: 'warning',
    description: 'A pedestrian crosswalk is ahead. Be prepared to stop for pedestrians.',
    relatedQuestionIds: ['row_002'],
  },
  {
    id: 'sign_school_zone',
    name: 'School Zone',
    category: 'warning',
    description: 'You are entering a school zone. Reduce speed when children are present. Watch for children crossing.',
    relatedQuestionIds: ['rs_009', 'ss_001'],
  },
  {
    id: 'sign_intersection',
    name: 'Intersection Ahead',
    category: 'warning',
    description: 'An intersection is ahead. Be prepared to stop or yield to crossing traffic.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_stop_ahead',
    name: 'Stop Sign Ahead',
    category: 'warning',
    description: 'A stop sign is ahead. Begin slowing down to prepare to stop.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_signal_ahead',
    name: 'Traffic Signal Ahead',
    category: 'warning',
    description: 'A traffic signal is ahead. Be prepared to stop if the light is yellow or red.',
    relatedQuestionIds: [],
  },

  // Guide Signs
  {
    id: 'sign_interstate',
    name: 'Interstate Route',
    category: 'guide',
    description: 'Indicates an Interstate highway. Red, white, and blue shield shape shows the route number.',
    relatedQuestionIds: ['rs_006'],
  },
  {
    id: 'sign_us_route',
    name: 'US Route',
    category: 'guide',
    description: 'Indicates a US highway route. White shield shape on black background shows the route number.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_state_route',
    name: 'State Route',
    category: 'guide',
    description: 'Indicates a state highway. Shape and color vary by state.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_hospital',
    name: 'Hospital',
    category: 'guide',
    description: 'A hospital is nearby in the direction indicated. Blue background with white "H".',
    relatedQuestionIds: ['rs_007'],
  },
  {
    id: 'sign_gas',
    name: 'Gas Station',
    category: 'guide',
    description: 'A gas station is nearby in the direction indicated.',
    relatedQuestionIds: ['rs_007'],
  },
  {
    id: 'sign_food',
    name: 'Food Services',
    category: 'guide',
    description: 'Restaurants or food services are nearby in the direction indicated.',
    relatedQuestionIds: ['rs_007'],
  },
  {
    id: 'sign_lodging',
    name: 'Lodging',
    category: 'guide',
    description: 'Hotels or lodging facilities are nearby in the direction indicated.',
    relatedQuestionIds: ['rs_007'],
  },
  {
    id: 'sign_rest_area',
    name: 'Rest Area',
    category: 'guide',
    description: 'A rest area is ahead at the distance or exit indicated.',
    relatedQuestionIds: ['rs_007'],
  },
  {
    id: 'sign_exit',
    name: 'Exit Sign',
    category: 'guide',
    description: 'Indicates an exit from the highway. Shows exit number and/or destination.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_mile_marker',
    name: 'Mile Marker',
    category: 'guide',
    description: 'Indicates the distance from the state line or beginning of the route. Useful for reporting emergencies or planning trips.',
    relatedQuestionIds: [],
  },

  // Construction Signs
  {
    id: 'sign_road_work',
    name: 'Road Work Ahead',
    category: 'construction',
    description: 'Construction or maintenance work is ahead. Slow down and watch for workers and equipment.',
    relatedQuestionIds: ['rs_008', 'ss_007'],
  },
  {
    id: 'sign_detour',
    name: 'Detour',
    category: 'construction',
    description: 'The normal route is closed. Follow the detour signs to an alternate route.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_road_closed',
    name: 'Road Closed',
    category: 'construction',
    description: 'The road ahead is closed. You must turn around or take an alternate route.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_flagger',
    name: 'Flagger Ahead',
    category: 'construction',
    description: 'A flagger is ahead directing traffic through a work zone. Be prepared to stop and follow their directions.',
    relatedQuestionIds: ['ss_007'],
  },
  {
    id: 'sign_one_lane',
    name: 'One Lane Road Ahead',
    category: 'construction',
    description: 'Traffic is reduced to one lane ahead. Be prepared to merge and follow any flaggers or signals.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_shoulder_closed',
    name: 'Shoulder Closed',
    category: 'construction',
    description: 'The road shoulder is closed or unavailable. Do not use the shoulder.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_fresh_oil',
    name: 'Fresh Oil',
    category: 'construction',
    description: 'Fresh oil or tar has been applied to the road. Reduce speed to prevent damage to your vehicle and the road surface.',
    relatedQuestionIds: [],
  },
  {
    id: 'sign_uneven_lanes',
    name: 'Uneven Lanes',
    category: 'construction',
    description: 'Lanes are at different levels due to construction. Reduce speed and drive carefully.',
    relatedQuestionIds: [],
  },
];

/**
 * Get signs by category
 */
export const getSignsByCategory = (category: SignCategory): RoadSign[] => {
  return signs.filter(s => s.category === category);
};

/**
 * Search signs by name or description
 */
export const searchSigns = (query: string): RoadSign[] => {
  const lowerQuery = query.toLowerCase();
  return signs.filter(
    s =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.description.toLowerCase().includes(lowerQuery)
  );
};

/**
 * Get sign by ID
 */
export const getSignById = (id: string): RoadSign | undefined => {
  return signs.find(s => s.id === id);
};

/**
 * Get all unique categories
 */
export const getSignCategories = (): SignCategory[] => {
  return ['regulatory', 'warning', 'guide', 'construction'];
};

export default signs;
