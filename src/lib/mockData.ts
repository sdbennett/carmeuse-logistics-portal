export type UserRole = 'carrier' | 'customer' | 'operations_aggregate' | 'operations_chemical';

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  parent_carrier_id?: string;
}

export interface Quarry {
  id: string;
  name: string;
  location?: string;
  active: boolean;
}

export interface Carrier {
  id: string;
  name: string;
  active: boolean;
}

export interface Customer {
  id: string;
  name: string;
  carrier_id: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  code?: string;
  type?: 'aggregate' | 'chemical';
  active: boolean;
}

export interface Vessel {
  id: string;
  name: string;
  carrier_id?: string;
  active: boolean;
}

export interface VesselSchedule {
  id: string;
  load_number: string;
  quarry_id?: string;
  vessel_id?: string;
  carrier_id?: string;
  customer_id?: string;
  product_id?: string;
  dock_location?: string;
  dock_location_detail?: string;
  date: string;
  time?: string;
  tonnage?: number;
  grade?: string;
  status?: string;
  dock_type?: string;
  comments?: string;
  bol_search?: string;
  period?: string;
  wb?: string;
  demo?: number;
  b?: number;
  c?: number;
  e1?: number;
  e2?: number;
  g1?: number;
  g3?: number;
  h?: number;
  h3?: number;
  nd_scr?: number;
  dd_lsp?: number;
  g3_mod?: number;
  z_tbd?: number;
}

export interface CustomerDelayReport {
  id: string;
  bol: string;
  customer_id?: string;
  vessel_id?: string;
  tonnage?: number;
  draft_fwd?: number;
  draft_aft?: number;
  water_gauge?: number;
  arrival?: string;
  vessel_ready?: string;
  finished_loading?: string;
  shift_delay?: number;
  vessel_delay?: number;
  dock_delay?: number;
  weather_delay?: number;
  traffic_delay?: number;
  calculated_ton_hour?: number;
}

export interface DailyVesselLineup {
  id: string;
  quarry?: string;
  vessel_id?: string;
  date_time?: string;
  customer?: string;
  status?: 'scheduled' | 'confirmed' | 'loading' | 'delayed';
}

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@carmeuse.com',
    password: 'test123',
  },
];

export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    email: 'admin@carmeuse.com',
    full_name: 'Admin User',
    role: 'operations_aggregate',
  },
];

export const mockQuarries: Quarry[] = [
  { id: 'q1', name: 'Calcite', location: 'Michigan', active: true },
  { id: 'q2', name: 'Marblehead', location: 'Ohio', active: true },
  { id: 'q3', name: 'Grand River', location: 'Ohio', active: true },
  { id: 'q4', name: 'Port Inland', location: 'Michigan', active: true },
  { id: 'q5', name: 'Rogers City', location: 'Michigan', active: true },
];

export const mockCarriers: Carrier[] = [
  { id: 'c1', name: 'USS - Minntac', active: true },
  { id: 'c2', name: 'Fisher Sand & Gravel - Bay City', active: true },
  { id: 'c3', name: 'American Courage', active: true },
  { id: 'c4', name: 'DLC Minerals', active: true },
  { id: 'c5', name: 'Graymont - Superior', active: true },
];

export const mockCustomers: Customer[] = [
  { id: 'cu1', name: 'Duluth, MN', carrier_id: 'c1', active: true },
  { id: 'cu2', name: 'Bay City, MI', carrier_id: 'c2', active: true },
  { id: 'cu3', name: 'Grand River, OH', carrier_id: 'c4', active: true },
  { id: 'cu4', name: 'Gary, IN', carrier_id: 'c4', active: true },
  { id: 'cu5', name: 'Cleveland, OH', carrier_id: 'c2', active: true },
  { id: 'cu6', name: 'Detroit, MI', carrier_id: 'c3', active: true },
  { id: 'cu7', name: 'Chicago, IL', carrier_id: 'c1', active: true },
];

export const mockProducts: Product[] = [
  { id: 'p1', name: 'Pellet Flux', code: '100-C', type: 'aggregate', active: true },
  { id: 'p2', name: 'Limeburning - HiCal', code: '40-E1', type: 'chemical', active: true },
  { id: 'p3', name: 'Limeburning - HiCal', code: '60-E2', type: 'chemical', active: true },
  { id: 'p4', name: 'O-Blend', code: '100-G3', type: 'aggregate', active: true },
  { id: 'p5', name: 'TBD', code: undefined, type: undefined, active: true },
  { id: 'p6', name: 'MI-21AA CA', code: 'MI-21AA', type: 'aggregate', active: true },
  { id: 'p7', name: 'MI-29A', code: 'MI-29A', type: 'aggregate', active: true },
  { id: 'p8', name: 'MI-5AA', code: 'MI-5AA', type: 'aggregate', active: true },
  { id: 'p9', name: 'ASTM-8', code: 'ASTM-8', type: 'aggregate', active: true },
  { id: 'p10', name: 'ASTM-27', code: 'ASTM-27', type: 'aggregate', active: true },
  { id: 'p11', name: 'OH-411', code: 'OH-411', type: 'aggregate', active: true },
  { id: 'p12', name: '70-E1', code: '70-E1', type: 'chemical', active: true },
];

export const mockVessels: Vessel[] = [
  { id: 'v1', name: 'John J Boland', carrier_id: 'c1', active: true },
  { id: 'v2', name: 'Ashtabula', carrier_id: 'c2', active: true },
  { id: 'v3', name: 'Manistowoc', carrier_id: 'c2', active: true },
  { id: 'v4', name: 'H Lee White', carrier_id: 'c1', active: true },
  { id: 'v5', name: 'American Mariner', carrier_id: 'c3', active: true },
  { id: 'v6', name: 'Great Republic', carrier_id: 'c4', active: true },
  { id: 'v7', name: 'Maumee', carrier_id: 'c3', active: true },
  { id: 'v8', name: 'John G Munson', carrier_id: 'c5', active: true },
  { id: 'v9', name: 'Indiana Harbor', carrier_id: 'c1', active: true },
  { id: 'v10', name: 'Paul R Tregurtha', carrier_id: 'c4', active: true },
  { id: 'v11', name: 'Burns Harbor', carrier_id: 'c2', active: true },
  { id: 'v12', name: 'James R Barker', carrier_id: 'c3', active: true },
];

export const mockVesselSchedules: VesselSchedule[] = [
  {
    id: 's1',
    load_number: '204',
    quarry_id: 'q1',
    vessel_id: 'v1',
    carrier_id: 'c1',
    customer_id: 'cu1',
    product_id: 'p1',
    dock_location: 'Duluth, MN',
    dock_location_detail: 'Duluth, MN',
    date: '2025-09-21',
    time: '06:00',
    tonnage: 30000,
    grade: '100-C',
    status: 'Active',
    dock_type: 'S',
    comments: undefined,
    period: 'Current Week',
    wb: 'S',
    c: 30000,
  },
  {
    id: 's2',
    load_number: '205',
    quarry_id: 'q1',
    vessel_id: 'v2',
    carrier_id: 'c2',
    customer_id: 'cu2',
    product_id: 'p6',
    dock_location: 'Bay City, MI',
    dock_location_detail: 'Bay City, MI',
    date: '2025-09-21',
    time: '14:00',
    tonnage: 25000,
    grade: '55-D5',
    status: 'Active',
    dock_type: 'N',
    comments: undefined,
    period: 'Current Week',
    wb: 'N',
    h: 6250,
    nd_scr: 5000,
    dd_lsp: 13750,
  },
  {
    id: 's3',
    load_number: '206',
    quarry_id: 'q2',
    vessel_id: 'v3',
    carrier_id: 'c2',
    customer_id: 'cu3',
    product_id: 'p2',
    dock_location: 'Grand River, OH',
    dock_location_detail: 'Grand River, OH',
    date: '2025-09-22',
    time: '23:00',
    tonnage: 19000,
    grade: '100-E1',
    status: 'Active',
    dock_type: 'S',
    comments: 'Can go Erie or LA Huron',
    period: 'Current Week',
  },
  {
    id: 's4',
    load_number: '207',
    quarry_id: 'q1',
    vessel_id: 'v2',
    carrier_id: 'c2',
    customer_id: 'cu2',
    product_id: 'p5',
    dock_location: 'Bay City, MI',
    dock_location_detail: 'Windsor, Ontario',
    date: '2025-09-22',
    time: '23:00',
    tonnage: 25000,
    grade: '100-s - TBD',
    status: 'Active',
    dock_type: 'N',
    comments: undefined,
    period: 'Current Week',
  },
  {
    id: 's5',
    load_number: '210',
    quarry_id: 'q1',
    vessel_id: 'v6',
    carrier_id: 'c4',
    customer_id: 'cu4',
    product_id: 'p2',
    dock_location: 'Gary, IN',
    dock_location_detail: 'Gary, IN',
    date: '2025-09-23',
    time: '13:00',
    tonnage: 23000,
    grade: '40-E1/ 60-E2',
    status: 'Active',
    dock_type: 'S',
    comments: undefined,
    period: 'Current Week',
  },
  {
    id: 's6',
    load_number: '211',
    quarry_id: 'q1',
    vessel_id: 'v4',
    carrier_id: 'c1',
    customer_id: 'cu1',
    product_id: 'p1',
    dock_location: 'Duluth, MN',
    dock_location_detail: 'Duluth, MN',
    date: '2025-09-24',
    time: '14:00',
    tonnage: 30000,
    grade: '100-C',
    status: 'Active',
    dock_type: 'S',
    comments: undefined,
    period: 'Current Week',
  },
  {
    id: 's7',
    load_number: '212',
    quarry_id: 'q2',
    vessel_id: 'v3',
    carrier_id: 'c2',
    customer_id: 'cu3',
    product_id: 'p2',
    dock_location: 'Grand River, OH',
    dock_location_detail: 'Grand River, OH',
    date: '2025-09-25',
    time: '08:00',
    tonnage: 20000,
    grade: '40-E1',
    status: 'Arrived',
    dock_type: 'W/S',
    comments: undefined,
    period: 'Current Week',
  },
  {
    id: 's8',
    load_number: '213',
    quarry_id: 'q1',
    vessel_id: 'v5',
    carrier_id: 'c3',
    customer_id: 'cu2',
    product_id: 'p4',
    dock_location: 'Bay City, MI',
    dock_location_detail: 'Bay City, MI',
    date: '2025-09-26',
    time: '10:00',
    tonnage: 28000,
    grade: '100-G3',
    status: 'TBD',
    dock_type: 'N',
    comments: 'Pending confirmation',
    period: 'Current Week',
  },
  {
    id: 's9',
    load_number: '214',
    quarry_id: 'q3',
    vessel_id: 'v7',
    carrier_id: 'c3',
    customer_id: 'cu5',
    product_id: 'p11',
    dock_location: 'Cleveland, OH',
    dock_location_detail: 'Cleveland, OH',
    date: '2025-09-27',
    time: '09:30',
    tonnage: 22000,
    grade: 'OH-411',
    status: 'Cancelled',
    dock_type: 'S',
    comments: 'Cancelled due to weather',
    period: 'Current Week',
  },
  {
    id: 's10',
    load_number: '215',
    quarry_id: 'q4',
    vessel_id: 'v9',
    carrier_id: 'c1',
    customer_id: 'cu6',
    product_id: 'p9',
    dock_location: 'Detroit, MI',
    dock_location_detail: 'Detroit, MI',
    date: '2025-09-28',
    time: '15:00',
    tonnage: 32000,
    grade: 'ASTM-8',
    status: 'Loaded',
    dock_type: 'N',
    comments: 'Loading completed ahead of schedule',
    period: 'Current Week',
  },
  {
    id: 's11',
    load_number: '216',
    quarry_id: 'q5',
    vessel_id: 'v10',
    carrier_id: 'c4',
    customer_id: 'cu7',
    product_id: 'p1',
    dock_location: 'Chicago, IL',
    dock_location_detail: 'Chicago, IL',
    date: '2025-09-29',
    time: '07:00',
    tonnage: 35000,
    grade: '100-C',
    status: 'Active',
    dock_type: 'W/S',
    comments: undefined,
    period: 'Current Week',
  },
  {
    id: 's12',
    load_number: '217',
    quarry_id: 'q2',
    vessel_id: 'v11',
    carrier_id: 'c2',
    customer_id: 'cu3',
    product_id: 'p2',
    dock_location: 'Grand River, OH',
    dock_location_detail: 'Grand River, OH',
    date: '2025-10-01',
    time: '11:00',
    tonnage: 21000,
    grade: '40-E1',
    status: 'TBD',
    dock_type: 'S',
    comments: 'Waiting for vessel availability',
    period: 'Current Month Forecast',
  },
  {
    id: 's13',
    load_number: '218',
    quarry_id: 'q1',
    vessel_id: 'v12',
    carrier_id: 'c3',
    customer_id: 'cu2',
    product_id: 'p7',
    dock_location: 'Bay City, MI',
    dock_location_detail: 'Bay City, MI',
    date: '2025-10-02',
    time: '13:30',
    tonnage: 26000,
    grade: 'MI-29A',
    status: 'Active',
    dock_type: 'N',
    comments: undefined,
    period: 'Current Month Forecast',
  },
  {
    id: 's14',
    load_number: '219',
    quarry_id: 'q4',
    vessel_id: 'v1',
    carrier_id: 'c1',
    customer_id: 'cu1',
    product_id: 'p1',
    dock_location: 'Duluth, MN',
    dock_location_detail: 'Duluth, MN',
    date: '2025-10-03',
    time: '06:30',
    tonnage: 31000,
    grade: '100-C',
    status: 'Arrived',
    dock_type: 'S',
    comments: 'Early arrival',
    period: 'Current Month Forecast',
  },
  {
    id: 's15',
    load_number: '220',
    quarry_id: 'q3',
    vessel_id: 'v6',
    carrier_id: 'c4',
    customer_id: 'cu4',
    product_id: 'p3',
    dock_location: 'Gary, IN',
    dock_location_detail: 'Gary, IN',
    date: '2025-10-05',
    time: '16:00',
    tonnage: 24000,
    grade: '60-E2',
    status: 'Active',
    dock_type: 'W/S',
    comments: undefined,
    period: 'Current Month Forecast',
  },
  {
    id: 's16',
    load_number: '221',
    quarry_id: 'q5',
    vessel_id: 'v8',
    carrier_id: 'c5',
    customer_id: 'cu5',
    product_id: 'p10',
    dock_location: 'Cleveland, OH',
    dock_location_detail: 'Cleveland, OH',
    date: '2025-10-08',
    time: '10:00',
    tonnage: 27000,
    grade: 'ASTM-27',
    status: 'TBD',
    dock_type: 'N',
    comments: 'Product availability pending',
    period: 'Current Month Forecast',
  },
  {
    id: 's17',
    load_number: '222',
    quarry_id: 'q2',
    vessel_id: 'v3',
    carrier_id: 'c2',
    customer_id: 'cu6',
    product_id: 'p8',
    dock_location: 'Detroit, MI',
    dock_location_detail: 'Detroit, MI',
    date: '2025-11-02',
    time: '08:00',
    tonnage: 29000,
    grade: 'MI-5AA',
    status: 'Active',
    dock_type: 'S',
    comments: undefined,
    period: 'Next Month',
  },
  {
    id: 's18',
    load_number: '223',
    quarry_id: 'q1',
    vessel_id: 'v4',
    carrier_id: 'c1',
    customer_id: 'cu7',
    product_id: 'p1',
    dock_location: 'Chicago, IL',
    dock_location_detail: 'Chicago, IL',
    date: '2025-11-05',
    time: '14:00',
    tonnage: 33000,
    grade: '100-C',
    status: 'TBD',
    dock_type: 'N',
    comments: 'Tentative schedule',
    period: 'Next Month',
  },
  {
    id: 's19',
    load_number: '224',
    quarry_id: 'q4',
    vessel_id: 'v11',
    carrier_id: 'c2',
    customer_id: 'cu2',
    product_id: 'p6',
    dock_location: 'Bay City, MI',
    dock_location_detail: 'Bay City, MI',
    date: '2025-11-08',
    time: '12:00',
    tonnage: 25500,
    grade: 'MI-21AA',
    status: 'Active',
    dock_type: 'W/S',
    comments: undefined,
    period: 'Next Month',
  },
  {
    id: 's20',
    load_number: '225',
    quarry_id: 'q3',
    vessel_id: 'v5',
    carrier_id: 'c3',
    customer_id: 'cu3',
    product_id: 'p11',
    dock_location: 'Grand River, OH',
    dock_location_detail: 'Grand River, OH',
    date: '2025-11-12',
    time: '09:00',
    tonnage: 20000,
    grade: 'OH-411',
    status: 'Active',
    dock_type: 'S',
    comments: undefined,
    period: 'Next Month',
  },
];

export const mockCustomerDelayReports: CustomerDelayReport[] = [
  {
    id: 'd1',
    bol: 'PMV 25/127-A',
    customer_id: 'cu1',
    vessel_id: 'v5',
    tonnage: 30000,
    arrival: '9/24/2025',
    vessel_ready: '18:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd2',
    bol: 'PMV 25/127-B',
    customer_id: 'cu2',
    vessel_id: 'v1',
    tonnage: 5500,
    arrival: '9/21/2025',
    vessel_ready: '18:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd3',
    bol: 'PMV 25/128-C',
    customer_id: 'cu3',
    vessel_id: 'v8',
    tonnage: 32000,
    arrival: '9/16/2025',
    vessel_ready: '21:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd4',
    bol: 'CAV 25/124-D',
    customer_id: 'cu4',
    vessel_id: 'v12',
    tonnage: 27000,
    arrival: '9/25/2025',
    vessel_ready: '18:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd5',
    bol: 'CAV 25/124-E',
    customer_id: 'cu1',
    vessel_id: 'v6',
    tonnage: 25000,
    arrival: '9/25/2025',
    vessel_ready: '2:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd6',
    bol: 'PMV 25/129-F',
    customer_id: 'cu5',
    vessel_id: 'v4',
    tonnage: 11000,
    arrival: '9/23/2025',
    vessel_ready: '15:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd7',
    bol: 'CDV 25/106-G',
    customer_id: 'cu5',
    vessel_id: 'v4',
    tonnage: 11000,
    arrival: '9/23/2025',
    vessel_ready: '2:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd8',
    bol: 'CAV 25/217-H',
    customer_id: 'cu2',
    vessel_id: 'v7',
    tonnage: 12000,
    arrival: '9/25/2025',
    vessel_ready: '13:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd9',
    bol: 'CAV 25/217-I',
    customer_id: 'cu2',
    vessel_id: 'v7',
    tonnage: 6000,
    arrival: '9/25/2025',
    vessel_ready: '13:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd10',
    bol: 'CAV 25/236-I',
    customer_id: 'cu3',
    vessel_id: 'v3',
    tonnage: 16000,
    arrival: '9/22/2025',
    vessel_ready: '23:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd11',
    bol: 'CDV 25/103-J',
    customer_id: 'cu2',
    vessel_id: 'v2',
    tonnage: 12000,
    arrival: '9/24/2025',
    vessel_ready: '4:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd12',
    bol: 'CAV 25/213-K',
    customer_id: 'cu7',
    vessel_id: 'v10',
    tonnage: 35800,
    arrival: '9/26/2025',
    vessel_ready: '18:30',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd13',
    bol: 'PMV 25/128-L',
    customer_id: 'cu4',
    vessel_id: 'v8',
    tonnage: 38000,
    arrival: '9/21/2025',
    vessel_ready: '18:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd14',
    bol: 'PMV 25/127-M',
    customer_id: 'cu2',
    vessel_id: 'v1',
    tonnage: 4400,
    arrival: '9/21/2025',
    vessel_ready: '18:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd15',
    bol: 'CDV 25/103-N',
    customer_id: 'cu2',
    vessel_id: 'v2',
    tonnage: 8000,
    arrival: '9/24/2025',
    vessel_ready: '4:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd16',
    bol: 'CAV 25/226-O',
    customer_id: 'cu2',
    vessel_id: 'v5',
    tonnage: 23000,
    arrival: '9/23/2025',
    vessel_ready: '13:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd17',
    bol: 'CDV 25/102-P',
    customer_id: 'cu4',
    vessel_id: 'v7',
    tonnage: 25000,
    arrival: '9/24/2025',
    vessel_ready: '3:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
  {
    id: 'd18',
    bol: 'CAV 25/217-Q',
    customer_id: 'cu2',
    vessel_id: 'v7',
    tonnage: 6000,
    arrival: '9/25/2025',
    vessel_ready: '13:00',
    shift_delay: 0,
    vessel_delay: 0,
    dock_delay: 0,
    weather_delay: 0,
    traffic_delay: 0,
    calculated_ton_hour: 0,
  },
];

export const mockDailyVesselLineups: DailyVesselLineup[] = [
  { id: '1', quarry: 'Calcite', vessel_id: 'v7', date_time: 'Sun, Sep 21, 2025 06:00', customer: 'Vopak / Bristol' },
  { id: '2', quarry: 'Calcite', vessel_id: 'v2', date_time: 'Sun, Sep 21, 2025 14:00', customer: 'Robert S Pierson' },
  { id: '3', quarry: 'Calcite', vessel_id: 'v7', date_time: 'Mon, Sep 22, 2025 23:00', customer: 'Maintenance' },
  { id: '4', quarry: 'Calcite', vessel_id: 'v2', date_time: 'Tue, Sep 23, 2025 08:00', customer: 'Wilfred Sykes' },
  { id: '5', quarry: 'Calcite', vessel_id: 'v3', date_time: 'Tue, Sep 23, 2025 13:00', customer: 'Columbia' },
  { id: '6', quarry: 'Calcite', vessel_id: 'v4', date_time: 'Wed, Sep 24, 2025 11:00', customer: 'H Lee White' },
  { id: '7', quarry: 'Calcite', vessel_id: 'v5', date_time: 'Wed, Sep 24, 2025 16:00', customer: 'American Mariner' },
  { id: '8', quarry: 'Calcite', vessel_id: 'v6', date_time: 'Thu, Sep 25, 2025 02:00', customer: 'Great Republic' },
  { id: '9', quarry: 'Calcite', vessel_id: 'v2', date_time: 'Thu, Sep 25, 2025 02:00', customer: 'Ashtabula' },
  { id: '10', quarry: 'Drummond', vessel_id: 'v1', date_time: 'Sun, Sep 21, 2025 06:00', customer: 'Great Lakes Trader' },
  { id: '11', quarry: 'Drummond', vessel_id: 'v8', date_time: 'Mon, Sep 22, 2025 17:00', customer: 'Sam Laud' },
  { id: '12', quarry: 'Drummond', vessel_id: 'v9', date_time: 'Tue, Sep 23, 2025 11:00', customer: 'Wilfred Sykes' },
  { id: '13', quarry: 'Port Inland', vessel_id: 'v10', date_time: 'Sun, Sep 21, 2025 01:00', customer: 'Wilfred Sykes' },
  { id: '14', quarry: 'Port Inland', vessel_id: 'v11', date_time: 'Sun, Sep 21, 2025 18:00', customer: 'Great Lakes Trader' },
  { id: '15', quarry: 'Port Inland', vessel_id: 'v7', date_time: 'Tue, Sep 23, 2025 11:00', customer: 'Ashtabula' },
  { id: '16', quarry: 'Cedarville', vessel_id: 'v12', date_time: 'Tue, Sep 23, 2025 02:00', customer: 'Wilfred Sykes' },
  { id: '17', quarry: 'Cedarville', vessel_id: 'v5', date_time: 'Tue, Sep 23, 2025 12:00', customer: 'Algonquin Trader' },
  { id: '18', quarry: 'Cedarville', vessel_id: 'v2', date_time: 'Wed, Sep 24, 2025 04:00', customer: 'Ashtabula' },
];
