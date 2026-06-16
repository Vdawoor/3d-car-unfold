import type { CategoryData } from '../types';

// Static metadata about the car displayed in the header
export const carInfo = {
  brand: 'Volkswagen',
  model: 'Virtus',
  variant: 'GT Line',
  year: 2024,
  tagline: '1.5L TSI EVO | 150 PS | 7-Speed DSG',
};

// All spec categories — each entry drives: sidebar button, spec panel content, and 3D annotations.
// `annotations` array defines where arrows point on the 3D model + what specs appear in the tooltip.
// `specs` array is the flat list shown in the right panel regardless of arrows.
export const categories: CategoryData[] = [
  {
    id: 'general',
    name: 'General',
    icon: 'info',
    description: 'Basic vehicle information',
    hasArrows: false,
    annotations: [],
    specs: [
      { label: 'Brand', value: 'Volkswagen' },
      { label: 'Model', value: 'Virtus' },
      { label: 'Variant', value: 'GT Line' },
      { label: 'Model Year', value: '2024' },
      { label: 'Body Type', value: 'Sedan' },
      { label: 'Seating Capacity', value: '5' },
    ],
  },
  {
    id: 'engine',
    name: 'Engine & Performance',
    icon: 'engine',
    description: 'Powertrain specifications',
    hasArrows: true,
    annotations: [
      {
        // Arrow anchored at the engine bay area (front-center of car)
        position: [0, 0.38, -3],
        // Label floats above-right of the engine bay
        labelOffset: [1.5, 2.2, -4],
        groupLabel: 'Engine',
        specs: [
          { label: 'Engine Type', value: '1.5L TSI EVO Turbocharged Petrol' },
          { label: 'Engine Capacity', value: '1498 cc' },
          { label: 'No. of Cylinders', value: '4 (Inline)' },
        ],
      },
      {
        // Second annotation slightly forward/lower — for performance figures
        position: [0, 0.38, -3],
        labelOffset: [-2.5, 2.2, -2],
        groupLabel: 'Performance',
        specs: [
          { label: 'Power Output', value: '150 PS @ 5000-6000 rpm' },
          { label: 'Torque', value: '250 Nm @ 1600-3500 rpm' },
          { label: 'Acceleration (0-100)', value: '8.4 seconds' },
          { label: 'Top Speed', value: '200 km/h' },
        ],
      },
    ],
    specs: [
      { label: 'Engine Type', value: '1.5L TSI EVO Turbocharged Petrol' },
      { label: 'Engine Capacity', value: '1498 cc' },
      { label: 'No. of Cylinders', value: '4 (Inline)' },
      { label: 'Power Output', value: '150 PS @ 5000-6000 rpm' },
      { label: 'Torque', value: '250 Nm @ 1600-3500 rpm' },
      { label: 'Acceleration (0-100)', value: '8.4 seconds' },
      { label: 'Top Speed', value: '200 km/h' },
    ],
  },
  {
    id: 'transmission',
    name: 'Transmission',
    icon: 'gears',
    description: 'Gearbox and drivetrain',
    hasArrows: true,
    annotations: [
      {
        // Points at the undercarriage/gearbox area (center-low, slightly forward)
        position: [1, -0.6, -2],
        labelOffset: [2.0, 2, 0.5],
        groupLabel: 'Drivetrain',
        specs: [
          { label: 'Transmission Type', value: '7-Speed DSG (Dual Clutch Automatic)' },
          { label: 'Drivetrain', value: 'Front-Wheel Drive (FWD)' },
        ],
      },
    ],
    specs: [
      { label: 'Transmission Type', value: '7-Speed DSG (Dual Clutch Automatic)' },
      { label: 'Drivetrain', value: 'Front-Wheel Drive (FWD)' },
    ],
  },
  {
    id: 'fuel',
    name: 'Fuel & Efficiency',
    icon: 'fuel',
    description: 'Fuel system and economy',
    hasArrows: true,
    annotations: [
      {
        // Points at the fuel filler area (rear-left side of the car)
        position: [1.4, 0.4, 2.4],
        labelOffset: [2.2, 1.5, 4.0],
        groupLabel: 'Fuel System',
        specs: [
          { label: 'Fuel Type', value: 'Petrol' },
          { label: 'Mileage (Claimed)', value: '18.12 km/l' },
          { label: 'Fuel Tank Capacity', value: '45 Litres' },
          { label: 'Emission Standard', value: 'BS6 Phase 2' },
        ],
      },
    ],
    specs: [
      { label: 'Fuel Type', value: 'Petrol' },
      { label: 'Mileage (Claimed)', value: '18.12 km/l' },
      { label: 'Fuel Tank Capacity', value: '45 Litres' },
      { label: 'Emission Standard', value: 'BS6 Phase 2' },
    ],
  },
  {
    id: 'dimensions',
    name: 'Dimensions',
    icon: 'ruler',
    description: 'Size and weight measurements',
    hasArrows: true,
    annotations: [
      {
        position: [1.55, -0.75, -0.4],
        labelOffset: [3.5, -0.4, 0],
        groupLabel: 'Length',
        straight: true,
        specs: [{ label: 'Length', value: '4561 mm' }],
      },
      {
        position: [0.9, 1.2, 0],
        labelOffset: [2.2, 1.8, 0],
        groupLabel: 'Width & Height',
        straight: true,
        specs: [
          { label: 'Width', value: '1752 mm' },
          { label: 'Height', value: '1507 mm' },
        ],
      },
      {
        position: [-1.5, -1.0, 2.0],
        labelOffset: [-2.2, -0.3, 0.8],
        groupLabel: 'Wheelbase',
        straight: true,
        specs: [
          { label: 'Wheelbase', value: '2651 mm' },
          { label: 'Ground Clearance', value: '179 mm' },
        ],
      },
      {
        // Points at trunk area for weight/boot info
        position: [0, 0.7, 3.6],
        labelOffset: [0, 1.0, 4.6],
        groupLabel: 'Weight & Boot',
        specs: [
          { label: 'Kerb Weight', value: '1210 kg' },
          { label: 'Boot Space', value: '521 Litres' },
        ],
      },
    ],
    specs: [
      { label: 'Length', value: '4561 mm' },
      { label: 'Width', value: '1752 mm' },
      { label: 'Height', value: '1507 mm' },
      { label: 'Wheelbase', value: '2651 mm' },
      { label: 'Ground Clearance', value: '179 mm' },
      { label: 'Kerb Weight', value: '1210 kg' },
      { label: 'Boot Space', value: '521 Litres' },
    ],
  },
  {
    id: 'suspension',
    name: 'Suspension & Brakes',
    icon: 'wheel',
    description: 'Ride and stopping systems',
    hasArrows: true,
    annotations: [
      {
        // Points at front-right wheel area
        position: [1.45, -1.0, -2.4],
        labelOffset: [2.2, -1.5, 0.0],
        groupLabel: 'Front Suspension',
        specs: [
          { label: 'Front Suspension', value: 'McPherson Strut' },
          { label: 'Front Brakes', value: 'Ventilated Disc' },
        ],
      },
      {
        // Points at rear-right wheel area
        position: [1.45, -1.0, 2.4],
        labelOffset: [2.2, -1.5, 4.0],
        groupLabel: 'Rear Suspension',
        specs: [
          { label: 'Rear Suspension', value: 'Torsion Beam' },
          { label: 'Rear Brakes', value: 'Drum' },
        ],
      },
      {
        // Points at front-left wheel for tyre info
        position: [-1.5, -1.0, 2.0],
        labelOffset: [-2.2, -0.3, 0.8],
        groupLabel: 'Tyres',
        specs: [{ label: 'Wheel & Tyre Size', value: '205/55 R16' }],
      },
    ],
    specs: [
      { label: 'Front Suspension', value: 'McPherson Strut' },
      { label: 'Rear Suspension', value: 'Torsion Beam' },
      { label: 'Front Brakes', value: 'Ventilated Disc' },
      { label: 'Rear Brakes', value: 'Drum' },
      { label: 'Wheel & Tyre Size', value: '205/55 R16' },
    ],
  },
  {
    id: 'safety',
    name: 'Safety',
    icon: 'shield',
    description: 'Safety features and ratings',
    hasArrows: true,
    annotations: [
      {
        // Points at roof/cabin area (crash structure zone)
        position: [0.6, 0.6, -1.4],
        labelOffset: [2.2, 1.5, 0.0],
        groupLabel: 'Crash Safety',
        specs: [
          { label: 'Airbags', value: '6 (Dual Front, Side, Curtain)' },
          { label: 'Crash Rating', value: '5-Star Global NCAP' },
        ],
      },
      {
        // Points at front-lower (braking/stability systems area)
        position: [0, 0.3, -1.0],
        labelOffset: [-2.0, 0.3, -0.5],
        groupLabel: 'Active Safety',
        specs: [
          { label: 'ABS', value: 'Yes, with EBD' },
          { label: 'Traction Control', value: 'ESC (Electronic Stability Control)' },
          { label: 'ISOFIX', value: 'Yes (Rear Seat)' },
        ],
      },
    ],
    specs: [
      { label: 'Airbags', value: '6 (Dual Front, Side, Curtain)' },
      { label: 'ABS', value: 'Yes, with EBD' },
      { label: 'Traction Control', value: 'ESC (Electronic Stability Control)' },
      { label: 'ISOFIX', value: 'Yes (Rear Seat)' },
      { label: 'Crash Rating', value: '5-Star Global NCAP' },
    ],
  },
  {
    id: 'interior',
    name: 'Interior',
    icon: 'seat',
    description: 'Cabin features and comfort',
    hasArrows: true,
    annotations: [
      {
        // Points at dashboard/center console area (infotainment screen location)
        position: [0.3, 0.3, -1.0],
        labelOffset: [2.0, 2.2, 0.5],
        groupLabel: 'Infotainment',
        specs: [
          { label: 'Infotainment', value: '10-inch Touchscreen' },
          { label: 'Connectivity', value: 'Wireless Android Auto & Apple CarPlay' },
        ],
      },
      {
        // Points at the cabin center (AC vents, seating area)
        position: [0.6, 0.0, 1.0],
        labelOffset: [-2.0, 2.2, 0],
        groupLabel: 'Comfort',
        specs: [
          { label: 'Climate Control', value: 'Automatic (Climatronic)' },
          { label: 'Seat Material', value: 'Leatherette' },
          { label: 'Steering Controls', value: 'Multi-function with Paddle Shifters' },
        ],
      },
    ],
    specs: [
      { label: 'Infotainment', value: '10-inch Touchscreen' },
      { label: 'Connectivity', value: 'Wireless Android Auto & Apple CarPlay' },
      { label: 'Climate Control', value: 'Automatic (Climatronic)' },
      { label: 'Seat Material', value: 'Leatherette' },
      { label: 'Steering Controls', value: 'Multi-function with Paddle Shifters' },
    ],
  },
  {
    id: 'exterior',
    name: 'Exterior',
    icon: 'car',
    description: 'External design features',
    hasArrows: true,
    annotations: [
      {
        position: [-1.2, 0, -3.35],
        labelOffset: [2.0, 1.0, -4.8],
        groupLabel: 'Front',
        extraPoints: [[1.2, 0, -3.35]],
        specs: [
          { label: 'Headlights', value: 'LED Projector with DRLs' },
        ],
      },
      {
        // Points at roof (sunroof area)
        position: [0, 1.2, -0.2],
        labelOffset: [0, 2.6, -0.5],
        groupLabel: 'Roof',
        specs: [
          { label: 'Sunroof', value: 'Electric Tilt & Slide' },
        ],
      },
      {
        position: [-1.4, -1.0, -2.4],
        labelOffset: [-3.5, 0.5, -2.5],
        groupLabel: 'Wheels & Mirrors',
        extraPoints: [[-1.6, 0.5, -1.4]],
        specs: [
          { label: 'Alloy Wheels', value: '16-inch Alloy (GT Design)' },
          { label: 'Mirrors', value: 'Electrically Adjustable ORVMs with Indicators' },
        ],
      },
    ],
    specs: [
      { label: 'Headlights', value: 'LED Projector with DRLs' },
      { label: 'Sunroof', value: 'Electric Tilt & Slide' },
      { label: 'Alloy Wheels', value: '16-inch Alloy (GT Design)' },
      { label: 'Mirrors', value: 'Electrically Adjustable ORVMs with Indicators' },
    ],
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: 'tag',
    description: 'Cost and ownership details',
    // No 3D arrows for pricing (not a physical car part)
    hasArrows: false,
    annotations: [],
    specs: [
      { label: 'Ex-Showroom Price', value: '₹ 15.59 Lakh (approx.)' },
      { label: 'On-Road Price', value: '₹ 18.20 Lakh (approx., varies by city)' },
      { label: 'Warranty', value: '4 Years / 1,00,000 km' },
      { label: 'Maintenance Cost', value: '₹ 0.52/km (Service Value Package available)' },
    ],
  },
];
