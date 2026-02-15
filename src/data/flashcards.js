export const FORMULA_FLASHCARDS = {
  'physics_11_kinematics': {
    subject: 'Physics',
    class: 11,
    chapter: 'Kinematics',
    cards: [
      { front: 'Velocity', back: 'Rate of change of displacement | v = Δs/Δt', latex: 'v = \\frac{\\Delta s}{\\Delta t}' },
      { front: 'Acceleration', back: 'Rate of change of velocity | a = Δv/Δt', latex: 'a = \\frac{\\Delta v}{\\Delta t}' },
      { front: 'Equation of Motion (1)', back: 'v = u + at | Final velocity, u = initial, a = acceleration, t = time', latex: 'v = u + at' },
      { front: 'Equation of Motion (2)', back: 's = ut + ½at² | Displacement equation', latex: 's = ut + \\frac{1}{2}at^2' },
      { front: 'Equation of Motion (3)', back: 'v² = u² + 2as | Velocity and displacement relation', latex: 'v^2 = u^2 + 2as' },
      { front: 'Average Velocity', back: '(Initial + Final velocity)/2 or Total displacement/Total time', latex: 'v_{avg} = \\frac{u + v}{2}' },
    ]
  },
  'physics_11_laws': {
    subject: 'Physics',
    class: 11,
    chapter: 'Laws of Motion',
    cards: [
      { front: 'Newton\'s First Law', back: 'An object continues in uniform motion unless acted by external force | Law of Inertia', latex: 'F = 0 \\implies a = 0' },
      { front: 'Newton\'s Second Law', back: 'Force is directly proportional to rate of change of momentum | F = ma', latex: 'F = ma' },
      { front: 'Newton\'s Third Law', back: 'For every action, there is equal and opposite reaction', latex: 'F_{AB} = -F_{BA}' },
      { front: 'Momentum', back: 'Product of mass and velocity | p = mv', latex: 'p = mv' },
      { front: 'Impulse', back: 'Change in momentum | J = FΔt = Δp', latex: 'J = F\\Delta t = \\Delta p' },
      { front: 'Weight', back: 'Gravitational force on an object | W = mg', latex: 'W = mg' },
    ]
  },
  'physics_12_electricity': {
    subject: 'Physics',
    class: 12,
    chapter: 'Electric Charges and Fields',
    cards: [
      { front: 'Coulomb\'s Law', back: 'F = kq₁q₂/r² | Force between two charges | k = 9×10⁹ Nm²/C²', latex: 'F = k\\frac{q_1 q_2}{r^2}' },
      { front: 'Electric Field', back: 'Force per unit charge | E = F/q = kQ/r²', latex: 'E = \\frac{F}{q} = k\\frac{Q}{r^2}' },
      { front: 'Electric Potential', back: 'Work done per unit charge | V = W/q = kQ/r', latex: 'V = \\frac{W}{q} = k\\frac{Q}{r}' },
      { front: 'Capacitance', back: 'Charge per unit potential | C = Q/V = ε₀εᵣA/d', latex: 'C = \\frac{Q}{V} = \\frac{\\varepsilon_0 \\varepsilon_r A}{d}' },
      { front: 'Gauss\'s Law', back: 'Φ = Q_enclosed/ε₀ | Electric flux through closed surface', latex: '\\Phi = \\frac{Q_{enclosed}}{\\varepsilon_0}' },
    ]
  },
  'chemistry_11_bonds': {
    subject: 'Chemistry',
    class: 11,
    chapter: 'Chemical Bonding',
    cards: [
      { front: 'Ionic Bond', back: 'Electrostatic attraction between cation and anion | Formed by complete electron transfer', latex: '' },
      { front: 'Covalent Bond', back: 'Sharing of electron pair between atoms | Bond order indicates number of shared pairs', latex: '' },
      { front: 'Coordinate Bond', back: 'Both electrons in shared pair from same atom | Also called dative bond', latex: '' },
      { front: 'Hydrogen Bond', back: 'Intermolecular force between H and highly electronegative atoms (O, N, F)', latex: '' },
      { front: 'Bond Energy', back: 'Energy required to break one mole of bonds | Energy is released during bond formation', latex: '' },
    ]
  },
  'chemistry_12_thermodynamics': {
    subject: 'Chemistry',
    class: 12,
    chapter: 'Thermodynamics',
    cards: [
      { front: 'First Law of Thermodynamics', back: 'ΔU = q - w | Change in internal energy = heat - work', latex: '\\Delta U = q - w' },
      { front: 'Enthalpy', back: 'H = U + PV | Total heat content of a system', latex: 'H = U + PV' },
      { front: 'Entropy', back: 'S = measure of disorder/randomness in a system | ΔS = q_rev/T', latex: '\\Delta S = \\frac{q_{rev}}{T}' },
      { front: 'Gibbs Free Energy', back: 'G = H - TS | Predicts spontaneity | ΔG < 0 for spontaneous reaction', latex: 'G = H - TS' },
      { front: 'Hess\'s Law', back: 'Enthalpy change is independent of path | ΔH(total) = sum of ΔH of steps', latex: '' },
    ]
  },
  'mathematics_11_algebra': {
    subject: 'Mathematics',
    class: 11,
    chapter: 'Algebra',
    cards: [
      { front: 'Quadratic Formula', back: 'x = (-b ± √(b²-4ac))/2a | Roots of ax² + bx + c = 0', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
      { front: 'Sum of n terms of AP', back: 'S_n = n/2 × (2a + (n-1)d) | Also S_n = n/2 × (first + last term)', latex: 'S_n = \\frac{n}{2}(2a + (n-1)d)' },
      { front: 'Sum of n terms of GP', back: 'S_n = a(r^n - 1)/(r - 1) if r ≠ 1', latex: 'S_n = \\frac{a(r^n - 1)}{r - 1}' },
      { front: 'Binomial Theorem', back: '(x + y)ⁿ = Σ C(n,r) × x^(n-r) × y^r', latex: '(x + y)^n = \\sum C(n,r) x^{n-r} y^r' },
      { front: 'nCr Formula', back: 'nCr = n! / (r! × (n-r)!)', latex: 'nCr = \\frac{n!}{r!(n-r)!}' },
    ]
  },
  'mathematics_12_calculus': {
    subject: 'Mathematics',
    class: 12,
    chapter: 'Calculus',
    cards: [
      { front: 'Derivative of x^n', back: 'd/dx(x^n) = n × x^(n-1)', latex: '\\frac{d}{dx}(x^n) = nx^{n-1}' },
      { front: 'Product Rule', back: 'd/dx(uv) = u×dv/dx + v×du/dx', latex: '\\frac{d}{dx}(uv) = u\\frac{dv}{dx} + v\\frac{du}{dx}' },
      { front: 'Chain Rule', back: 'dy/dx = dy/du × du/dx | Derivative of composite function', latex: '\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}' },
      { front: 'Integration by Parts', back: '∫u dv = uv - ∫v du', latex: '\\int u\\,dv = uv - \\int v\\,du' },
      { front: 'Power Rule Integration', back: '∫x^n dx = x^(n+1)/(n+1) + C (n ≠ -1)', latex: '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C' },
    ]
  },
  'biology_11_cell': {
    subject: 'Biology',
    class: 11,
    chapter: 'Cell: Unit of Life',
    cards: [
      { front: 'Prokaryote', back: 'Organism without a membrane-bound nucleus | Bacteria and Archaea', latex: '' },
      { front: 'Eukaryote', back: 'Organism with a membrane-bound nucleus | Plants, animals, fungi', latex: '' },
      { front: 'Nucleus', back: 'Contains DNA | Controls cell activities | Found in eukaryotes only', latex: '' },
      { front: 'Mitochondria', back: 'Powerhouse of the cell | Site of aerobic respiration | Produces ATP', latex: '' },
      { front: 'Chloroplast', back: 'Found in plant cells | Site of photosynthesis | Contains chlorophyll', latex: '' },
    ]
  },
  'biology_12_genetics': {
    subject: 'Biology',
    class: 12,
    chapter: 'Genetics',
    cards: [
      { front: 'Gene', back: 'Unit of heredity | Segment of DNA coding for a protein', latex: '' },
      { front: 'Allele', back: 'Different forms of a gene | Can be dominant or recessive', latex: '' },
      { front: 'Genotype', back: 'Genetic makeup of an organism | Represented as AA, Aa, or aa', latex: '' },
      { front: 'Phenotype', back: 'Observable characteristics of an organism | Result of genotype + environment', latex: '' },
      { front: 'Law of Segregation', back: 'Traits separate during gamete formation | Each gamete gets one allele', latex: '' },
    ]
  },
};

export const getFlashcards = (subject, classNum, chapter) => {
  const key = `${subject.toLowerCase()}_${classNum}_${chapter.toLowerCase().replace(/\s+/g, '_')}`;
  return FORMULA_FLASHCARDS[key] || null;
};

export const getAllFlashcardSets = () => {
  return Object.values(FORMULA_FLASHCARDS);
};

export const searchFlashcards = (query) => {
  const lowerQuery = query.toLowerCase();
  return Object.values(FORMULA_FLASHCARDS).filter(set =>
    set.subject.toLowerCase().includes(lowerQuery) ||
    set.chapter.toLowerCase().includes(lowerQuery)
  );
};
