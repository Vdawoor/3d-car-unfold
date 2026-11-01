import type { AIAgentResponse, SpecCategory } from '../types';

const API_URL = import.meta.env.PROD
  ? 'https://threed-car-unfold.onrender.com'
  : 'http://localhost:8000';

function getGuideUrl(): string {
  if (API_URL) return `${API_URL}/api/guide`;
  return '/api/guide';
}

export async function askAIAgent(userMessage: string): Promise<AIAgentResponse> {
  try {
    const res = await fetch(getGuideUrl(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: userMessage }),
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const data = await res.json();
    return {
      message: data.message,
      cameraPosition: data.cameraPosition,
      lookAt: data.lookAt,
      highlightPosition: data.highlightPosition,
      category: data.category as SpecCategory | undefined,
    };
  } catch {
    return localFallback(userMessage);
  }
}

interface ComponentEntry {
  keywords: string[];
  message: string;
  lookAt: [number, number, number];
  cameraPosition: [number, number, number];
  category: SpecCategory;
}

const COMPONENTS: ComponentEntry[] = [
  {
    keywords: ['engine', 'motor', 'turbo', 'turbocharger', 'cylinder', 'piston', 'horsepower', 'power', 'hp', 'ps', 'tsi', 'evo', 'torque'],
    message: 'The 1.5L TSI EVO turbocharged engine sits at the front under the hood. It produces 150 PS and 250 Nm of torque.',
    lookAt: [0, 0.38, -3],
    cameraPosition: [3, 2, -5],
    category: 'engine',
  },
  {
    keywords: ['transmission', 'gearbox', 'gear', 'clutch', 'dsg', 'drivetrain', 'fwd', 'drive'],
    message: 'The 7-speed DSG dual-clutch automatic transmission is located under the center of the car, connected to the front-wheel drivetrain.',
    lookAt: [1, -0.6, -2],
    cameraPosition: [3.5, 0.5, -3],
    category: 'transmission',
  },
  {
    keywords: ['fuel', 'petrol', 'gas', 'tank', 'filler', 'mileage', 'efficiency', 'economy'],
    message: 'The fuel filler cap is on the rear-left side. The 45-litre tank delivers around 18.12 km/l on the highway.',
    lookAt: [1.4, 0.4, 2.4],
    cameraPosition: [3.5, 1.5, 4],
    category: 'fuel',
  },
  {
    keywords: ['headlight', 'headlamp', 'drl', 'front light', 'led light'],
    message: 'The LED projector headlights with DRLs are at the front corners of the car, flanking the grille.',
    lookAt: [0, 0, -3.35],
    cameraPosition: [3, 1.5, -5.5],
    category: 'exterior',
  },
  {
    keywords: ['taillight', 'tail light', 'rear light', 'brake light'],
    message: 'The taillights are at the rear of the car, integrated into the trunk lid and rear quarter panels.',
    lookAt: [0, 0.3, 3.5],
    cameraPosition: [3, 1.5, 5.5],
    category: 'exterior',
  },
  {
    keywords: ['wheel', 'tyre', 'tire', 'rim', 'alloy'],
    message: 'The Virtus GT rides on 16-inch alloy wheels (GT design) wrapped in 205/55 R16 tyres.',
    lookAt: [1.45, -1.0, -2.4],
    cameraPosition: [4, 0.5, -3],
    category: 'suspension',
  },
  {
    keywords: ['brake', 'braking', 'abs', 'disc', 'drum', 'ebd'],
    message: 'Ventilated disc brakes at the front and drum brakes at the rear, with ABS and EBD for safe stopping.',
    lookAt: [1.45, -1.0, -2.4],
    cameraPosition: [3.5, 0, -3.5],
    category: 'suspension',
  },
  {
    keywords: ['suspension', 'strut', 'mcpherson', 'torsion', 'shock', 'absorber', 'spring'],
    message: 'Front uses McPherson strut independent suspension, rear uses a torsion beam setup for a balanced ride.',
    lookAt: [1.45, -1.0, -2.4],
    cameraPosition: [3.5, 0, -2],
    category: 'suspension',
  },
  {
    keywords: ['sunroof', 'roof', 'moonroof'],
    message: 'The electric tilt-and-slide sunroof is on the roof above the front passengers.',
    lookAt: [0, 1.2, -0.2],
    cameraPosition: [3, 3.5, -1],
    category: 'exterior',
  },
  {
    keywords: ['mirror', 'orvm', 'side mirror', 'wing mirror'],
    message: 'Electrically adjustable ORVMs with integrated turn indicators sit on either side of the A-pillars.',
    lookAt: [-1.6, 0.5, -1.4],
    cameraPosition: [-4, 1.5, -2],
    category: 'exterior',
  },
  {
    keywords: ['dashboard', 'infotainment', 'screen', 'touchscreen', 'display', 'stereo', 'music', 'audio'],
    message: 'The 10-inch touchscreen infotainment system is centered on the dashboard, supporting wireless Android Auto & Apple CarPlay.',
    lookAt: [0.3, 0.3, -1.0],
    cameraPosition: [-2, 1.5, -2.5],
    category: 'interior',
  },
  {
    keywords: ['steering', 'paddle', 'shifter'],
    message: 'The multi-function steering wheel with paddle shifters gives you manual control of the 7-speed DSG.',
    lookAt: [0.3, 0.3, -1.0],
    cameraPosition: [-2, 1.5, -2],
    category: 'interior',
  },
  {
    keywords: ['seat', 'cabin', 'interior', 'leather', 'leatherette', 'comfort', 'ac', 'climate', 'air condition'],
    message: 'The cabin features leatherette seats with automatic Climatronic climate control for a premium feel.',
    lookAt: [0.6, 0, 1.0],
    cameraPosition: [-3, 2, 0],
    category: 'interior',
  },
  {
    keywords: ['trunk', 'boot', 'dickey', 'luggage', 'storage', 'cargo'],
    message: 'The trunk offers 521 litres of boot space — one of the largest in the sedan segment.',
    lookAt: [0, 0.7, 3.6],
    cameraPosition: [2.5, 2, 5.5],
    category: 'dimensions',
  },
  {
    keywords: ['hood', 'bonnet'],
    message: 'The hood/bonnet covers the engine bay at the front of the car.',
    lookAt: [0, 0.7, -2.5],
    cameraPosition: [3, 2.5, -4],
    category: 'exterior',
  },
  {
    keywords: ['grille', 'bumper', 'front bumper'],
    message: 'The front grille and bumper form the face of the Virtus, housing the chrome VW badge and air intakes.',
    lookAt: [0, 0, -3.5],
    cameraPosition: [2, 1, -6],
    category: 'exterior',
  },
  {
    keywords: ['airbag', 'safety', 'ncap', 'crash', 'collision'],
    message: 'The Virtus has a 5-star Global NCAP rating with 6 airbags for occupant protection.',
    lookAt: [0.6, 0.6, -1.4],
    cameraPosition: [3, 2, -2],
    category: 'safety',
  },
  {
    keywords: ['esc', 'stability', 'traction', 'isofix', 'child'],
    message: 'Electronic Stability Control and ISOFIX child seat mounts on the rear seats keep everyone safe.',
    lookAt: [0, 0.3, -1.0],
    cameraPosition: [-3, 1.5, -1],
    category: 'safety',
  },
  {
    keywords: ['windshield', 'windscreen', 'glass', 'window'],
    message: 'The front windshield provides excellent forward visibility.',
    lookAt: [0, 1.0, -1.5],
    cameraPosition: [3, 2.5, -3],
    category: 'exterior',
  },
  {
    keywords: ['dimension', 'length', 'width', 'height', 'size', 'big', 'long', 'tall', 'wide'],
    message: 'The Virtus measures 4561mm long, 1752mm wide, and 1507mm tall with a 2651mm wheelbase.',
    lookAt: [0, 0, 0],
    cameraPosition: [5, 2.5, -3],
    category: 'dimensions',
  },
  {
    keywords: ['weight', 'heavy', 'kerb', 'kg'],
    message: 'The Virtus GT Line has a kerb weight of 1210 kg.',
    lookAt: [0, 0, 0],
    cameraPosition: [5, 1.5, 0],
    category: 'dimensions',
  },
  {
    keywords: ['price', 'cost', 'rupee', 'lakh', 'expensive', 'cheap', 'afford', 'buy', 'warranty'],
    message: 'The Virtus GT Line is priced at approx. Rs 15.59 Lakh ex-showroom, with a 4-year warranty.',
    lookAt: [0, 0, 0],
    cameraPosition: [-4, 2, -6],
    category: 'pricing',
  },
  {
    keywords: ['door', 'handle'],
    message: 'The door handles are on the sides of the car. The Virtus is a 4-door sedan.',
    lookAt: [1.5, 0.3, -0.5],
    cameraPosition: [4, 1.5, -1],
    category: 'exterior',
  },
  {
    keywords: ['exhaust', 'muffler', 'pipe', 'emission', 'catalytic'],
    message: 'The exhaust exits at the rear underside. The engine meets BS6 Phase 2 emission standards.',
    lookAt: [0.5, -0.5, 3.0],
    cameraPosition: [3, 0.5, 5],
    category: 'engine',
  },
];

function localFallback(query: string): AIAgentResponse {
  const lower = query.toLowerCase();
  for (const comp of COMPONENTS) {
    if (comp.keywords.some((kw) => lower.includes(kw))) {
      return {
        message: comp.message,
        cameraPosition: comp.cameraPosition,
        lookAt: comp.lookAt,
        highlightPosition: comp.lookAt,
        category: comp.category,
      };
    }
  }
  return {
    message: "I can help you explore the Volkswagen Virtus! Try asking about the engine, headlights, wheels, interior, sunroof, trunk, or any other part.",
    cameraPosition: [-4, 2, -6],
    lookAt: [0, 0, 0],
    highlightPosition: [0, 0, 0],
    category: 'general',
  };
}
