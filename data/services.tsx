import type { ServicePageData } from '@/components/sections/ServicePageTemplate'

export const SERVICE_DATA: Record<string, ServicePageData> = {
  'interior-painting': {
    slug: 'interior-painting',
    title: 'Interior Painting',
    subtitle:
      'Transform any room with expert interior painting. From single accent walls to full home makeovers — we handle it all with precision and care.',
    description: (
      <>
        <h2 className="heading-3 text-primary mb-4">
          Expert Interior Painting for Every Room
        </h2>
        <p>
          A fresh coat of paint is one of the most impactful upgrades you can
          make to your home. At A Clean Look, we specialize in interior painting
          across Chicago and the North Shore, delivering flawless results in
          bedrooms, living rooms, kitchens, bathrooms, dining rooms, hallways,
          closets, and ceilings.
        </p>
        <p className="mt-4">
          We believe that preparation is 80% of the job. Before any paint goes
          on the wall, we carefully move furniture, lay drop cloths, tape trim
          and edges, patch nail holes and drywall imperfections, caulk gaps,
          sand rough spots, and prime where needed. The result? Clean lines,
          smooth finishes, and colors that look incredible.
        </p>
        <p className="mt-4">
          We use Benjamin Moore premium paints and offer guidance on the right
          finishes for each room — flat for ceilings, eggshell for living
          spaces, satin for kitchens and bathrooms, and semi-gloss for trim
          and doors. Every project comes with a detailed estimate so there
          are never surprises.
        </p>
      </>
    ),
    features: [
      {
        icon: 'Layers',
        title: 'Thorough Surface Prep',
        description:
          'Patching, sanding, caulking, and priming. We prep every surface to ensure paint adheres perfectly and lasts for years.',
      },
      {
        icon: 'Palette',
        title: 'Color Consultation',
        description:
          'Not sure what color to pick? We offer color selection guidance with real samples so you can see how colors look in your light.',
      },
      {
        icon: 'Shield',
        title: 'Premium Paints',
        description:
          'We use Benjamin Moore premium formulas — superior coverage, rich color, and low-VOC for healthier indoor air quality.',
      },
      {
        icon: 'Ruler',
        title: 'Clean, Precise Lines',
        description:
          'Meticulous taping and cutting-in for razor-sharp lines at ceilings, trim, and edges. No messy borders.',
      },
      {
        icon: 'Home',
        title: 'Furniture Protection',
        description:
          'We move and cover furniture, lay drop cloths, and tape off fixtures. Your belongings are fully protected.',
      },
      {
        icon: 'CheckCircle2',
        title: 'Final Walkthrough',
        description:
          'We do a detailed walkthrough together to ensure every wall, corner, and trim piece meets your expectations.',
      },
    ],
    process: [
      {
        title: 'Free In-Home Estimate',
        description:
          'We visit your home, measure the rooms, assess surface conditions, and provide a detailed written estimate — no obligation.',
      },
      {
        title: 'Color & Finish Selection',
        description:
          'We help you choose colors and finishes suited to each room. We bring large color samples so you can see how they look in your actual light.',
      },
      {
        title: 'Preparation & Protection',
        description:
          'Furniture is moved and covered. We patch holes, sand surfaces, caulk gaps, tape edges, and prime as needed — the foundation for a flawless finish.',
      },
      {
        title: 'Professional Painting',
        description:
          'Using premium Benjamin Moore paints and professional techniques, we apply even coats for smooth, consistent coverage throughout.',
      },
      {
        title: 'Cleanup & Walkthrough',
        description:
          'Everything is put back in place, all materials removed, and we walk through each room together to make sure you love the results.',
      },
    ],
    pricing: {
      items: [
        { label: 'Interior painting (per sq ft)', range: '$1.60 – $3.33' },
        { label: 'Interior painting (per hour)', range: '$31.60 – $53.60' },
        { label: 'Single room', range: '$400 – $900' },
        { label: 'Average room', range: '~$640' },
        { label: 'Full interior', range: '$3,500 – $8,000' },
        { label: 'Average full interior', range: '~$5,814' },
      ],
      disclaimer:
        'Exact pricing depends on room size, ceiling height, surface condition, number of colors, paint quality selected, and prep work required. We provide detailed itemized estimates after an in-home consultation.',
    },
    faqs: [
      {
        question: 'How long does interior painting take?',
        answer:
          'A single room typically takes 1 day. A full home interior (3-4 bedrooms) usually takes 3-5 days depending on prep work, number of colors, and complexity.',
      },
      {
        question: 'What paint brands do you use?',
        answer:
          'We primarily use Benjamin Moore for their superior coverage, color consistency, and durability. We also work with Sherwin-Williams upon request.',
      },
      {
        question: 'Do you move furniture?',
        answer:
          'Yes, we move furniture to the center of each room and cover everything with drop cloths. Heavy items like pianos or large entertainment centers may need to be moved beforehand.',
      },
      {
        question: 'How do I choose the right color?',
        answer:
          'We offer color consultation and bring large paint samples. We recommend testing 2-3 colors with sample patches on your wall to see how they look in your specific lighting at different times of day.',
      },
      {
        question: 'What finishes do you recommend?',
        answer:
          'Flat/matte for ceilings, eggshell for living rooms and bedrooms, satin for kitchens and bathrooms, semi-gloss for trim, doors, and high-traffic areas.',
      },
      {
        question: 'Will I need to leave during painting?',
        answer:
          'No, we use low-VOC paints and maintain ventilation. You can stay home during the project. We work room by room to minimize disruption.',
      },
    ],
    relatedSlugs: ['exterior-painting', 'commercial-painting', 'handyman'],
  },

  'exterior-painting': {
    slug: 'exterior-painting',
    title: 'Exterior Painting',
    subtitle:
      'Protect and beautify your home with weather-resistant exterior coatings built specifically for Chicago\'s demanding climate.',
    description: (
      <>
        <h2 className="heading-3 text-primary mb-4">
          Chicago-Tough Exterior Painting
        </h2>
        <p>
          Chicago&apos;s weather is brutal on home exteriors. From sub-zero
          winters and ice storms to hot, humid summers and UV exposure, your
          home&apos;s paint takes a beating. At A Clean Look, we specialize in
          exterior painting that stands up to everything the Midwest throws
          at it.
        </p>
        <p className="mt-4">
          We work with all exterior surfaces — wood siding, vinyl, brick,
          stucco, aluminum, and fiber cement. Our prep process includes power
          washing, scraping loose paint, sanding, caulking cracks and gaps,
          priming bare wood, and spot-treating problem areas. This attention
          to prep is what separates a paint job that lasts 3 years from one
          that lasts 10+.
        </p>
        <p className="mt-4">
          The best time for exterior painting in Chicago is late spring
          through early fall, when temperatures consistently stay above 50°F.
          We use premium exterior-grade paints from Benjamin Moore designed
          for temperature extremes, moisture resistance, and UV protection.
        </p>
      </>
    ),
    features: [
      {
        icon: 'Thermometer',
        title: 'Climate-Rated Products',
        description:
          'We use paints and primers specifically formulated for Midwest temperature extremes — from -20°F winters to 95°F summers.',
      },
      {
        icon: 'SprayCan',
        title: 'Professional Power Washing',
        description:
          'Every exterior job starts with thorough power washing to remove dirt, mildew, and loose paint for maximum adhesion.',
      },
      {
        icon: 'BrickWall',
        title: 'All Surface Types',
        description:
          'Wood, vinyl, brick, stucco, aluminum, and fiber cement — we have the expertise and products for every exterior material.',
      },
      {
        icon: 'Shield',
        title: 'Weather-Resistant Finishes',
        description:
          'UV-resistant, moisture-blocking, and flexible coatings that expand and contract with Chicago\'s temperature swings.',
      },
      {
        icon: 'Layers',
        title: 'Meticulous Prep Work',
        description:
          'Scraping, sanding, caulking, and priming all problem areas before paint goes on. Prep is the foundation of a lasting finish.',
      },
      {
        icon: 'Eye',
        title: 'Curb Appeal Boost',
        description:
          'A fresh exterior paint job can increase your home\'s value and transform its street presence. We help with color selection too.',
      },
    ],
    process: [
      {
        title: 'Free Exterior Assessment',
        description:
          'We inspect your home\'s exterior, identify areas needing repair, assess surface conditions, and provide a detailed estimate.',
      },
      {
        title: 'Color & Product Selection',
        description:
          'We recommend colors and products suited to your home\'s material and Chicago\'s climate. Large color samples provided.',
      },
      {
        title: 'Power Wash & Prep',
        description:
          'We power wash all surfaces, scrape loose paint, sand, caulk cracks, prime bare spots, and repair minor damage.',
      },
      {
        title: 'Professional Application',
        description:
          'Using brushes, rollers, and spray equipment as appropriate, we apply premium coatings for full, even coverage.',
      },
      {
        title: 'Final Inspection',
        description:
          'We walk the entire exterior together, touching up any areas and ensuring clean lines at trim, windows, and doors.',
      },
    ],
    pricing: {
      items: [
        { label: 'Exterior painting (per sq ft)', range: '$2.10 – $3.25' },
        { label: 'Full exterior (average home)', range: '$4,612 – $9,836' },
        { label: 'Average full exterior', range: '~$7,224' },
        { label: 'Trim & accent painting', range: '$1,500 – $3,500' },
      ],
      disclaimer:
        'Pricing depends on home size, number of stories, surface material and condition, paint quality, and amount of prep required. We provide free on-site estimates.',
    },
    faqs: [
      {
        question: 'What is the best time of year to paint exteriors in Chicago?',
        answer:
          'Late May through early October, when temperatures consistently stay above 50°F during application and drying. We monitor weather closely and schedule around rain.',
      },
      {
        question: 'How long does exterior paint last in Chicago?',
        answer:
          'With proper prep and premium paint, exterior paint typically lasts 7-10 years in Chicago. Factors like sun exposure, surface material, and paint quality affect longevity.',
      },
      {
        question: 'Do you paint brick homes?',
        answer:
          'Yes, we paint brick, but we always discuss whether painting is right for your specific brick. Once painted, brick requires periodic repainting. We use breathable masonry paints.',
      },
      {
        question: 'Can you match my current color exactly?',
        answer:
          'Yes, we can color-match any existing color. We take a sample chip to the paint store for precise computer matching.',
      },
      {
        question: 'Do I need to be home during exterior painting?',
        answer:
          'Not necessarily. As long as we have access to the exterior and water/electrical if needed, you can go about your day.',
      },
    ],
    relatedSlugs: ['interior-painting', 'power-washing', 'gutter-cleaning'],
  },

  'commercial-painting': {
    slug: 'commercial-painting',
    title: 'Commercial Painting',
    subtitle:
      'Professional painting for offices, retail, restaurants, and commercial properties with minimal disruption to your business.',
    description: (
      <>
        <h2 className="heading-3 text-primary mb-4">
          Professional Commercial Painting Services
        </h2>
        <p>
          A well-maintained commercial space reflects your brand and creates a
          positive impression on clients, customers, and employees. At A Clean
          Look, we provide commercial painting services for offices, retail
          stores, restaurants, medical facilities, HOA common areas, and
          multi-unit buildings across Chicago.
        </p>
        <p className="mt-4">
          We understand that business can&apos;t stop for painting. That&apos;s
          why we offer flexible scheduling, including after-hours and weekend
          work, to minimize disruption to your operations. We work fast,
          clean, and efficiently — with detailed project timelines so you know
          exactly what to expect.
        </p>
        <p className="mt-4">
          Our commercial services include color consultation aligned with
          your brand identity, durable commercial-grade finishes that stand up
          to heavy traffic, and adherence to all building codes and safety
          regulations. Whether it&apos;s a single office suite or an entire
          building, we handle projects of every scale.
        </p>
      </>
    ),
    features: [
      {
        icon: 'Clock',
        title: 'After-Hours & Weekend Work',
        description:
          'We schedule around your business hours to minimize disruption. Evenings, weekends, and holiday work available.',
      },
      {
        icon: 'Palette',
        title: 'Brand-Aligned Colors',
        description:
          'We consult on colors that match your brand identity and create the right atmosphere for your customers and employees.',
      },
      {
        icon: 'HardHat',
        title: 'Code Compliant',
        description:
          'Fully insured, OSHA-aware, and compliant with all building codes and safety regulations for commercial properties.',
      },
      {
        icon: 'Target',
        title: 'Project Management',
        description:
          'Dedicated project coordination with detailed timelines, progress updates, and a single point of contact.',
      },
      {
        icon: 'Shield',
        title: 'Commercial-Grade Finishes',
        description:
          'Durable, washable, scuff-resistant paints designed for high-traffic commercial environments.',
      },
      {
        icon: 'Users',
        title: 'Scalable Teams',
        description:
          'We can staff up for large projects to meet tight deadlines. One office or an entire building — we handle it.',
      },
    ],
    process: [
      {
        title: 'Site Assessment & Proposal',
        description:
          'We tour your facility, understand your needs and schedule constraints, and deliver a detailed proposal with timeline.',
      },
      {
        title: 'Schedule & Plan',
        description:
          'We coordinate a work schedule that minimizes business disruption — often evenings and weekends for occupied spaces.',
      },
      {
        title: 'Prepare & Protect',
        description:
          'All furniture, fixtures, and floors are protected. We prep surfaces, repair damage, and ensure a clean work area.',
      },
      {
        title: 'Professional Execution',
        description:
          'Our crews work efficiently with commercial-grade products for durable, professional results on your timeline.',
      },
      {
        title: 'Final Walkthrough',
        description:
          'We conduct a thorough inspection with you or your facility manager to ensure complete satisfaction.',
      },
    ],
    pricing: {
      items: [
        { label: 'Office suite (per sq ft)', range: '$1.80 – $3.50' },
        { label: 'Retail / restaurant', range: 'Custom quote' },
        { label: 'Common areas / hallways', range: '$2.00 – $4.00/sq ft' },
        { label: 'Full building exterior', range: 'Custom quote' },
      ],
      disclaimer:
        'Commercial pricing varies significantly based on space type, ceiling heights, surface condition, scheduling requirements, and scope. We provide free on-site estimates tailored to your project.',
    },
    faqs: [
      {
        question: 'Can you work after business hours?',
        answer:
          'Absolutely. We routinely work evenings, overnight, and weekends to avoid disrupting your business operations. We\'ll coordinate a schedule that works for you.',
      },
      {
        question: 'How do you handle occupied spaces?',
        answer:
          'We section off work areas, use low-VOC paints, maintain ventilation, and minimize noise. We can paint floor by floor or section by section.',
      },
      {
        question: 'Do you work with property managers and HOAs?',
        answer:
          'Yes, we work with property managers, HOAs, and building management companies regularly. We provide competitive bids and maintain ongoing maintenance contracts.',
      },
      {
        question: 'What commercial-grade paint do you use?',
        answer:
          'We use Benjamin Moore Scuff-X and Aura lines for commercial interiors — they\'re extremely durable, washable, and resist scuffs from high traffic.',
      },
    ],
    relatedSlugs: ['interior-painting', 'exterior-painting', 'power-washing'],
  },

  'power-washing': {
    slug: 'power-washing',
    title: 'Power Washing',
    subtitle:
      'Restore driveways, siding, decks, patios, and more with professional pressure washing. The fastest way to refresh your property.',
    description: (
      <>
        <h2 className="heading-3 text-primary mb-4">
          Professional Power Washing in Chicago
        </h2>
        <p>
          Chicago&apos;s winters leave behind salt, grime, mildew, and
          staining that dull your home&apos;s appearance. Professional power
          washing strips away years of buildup and instantly refreshes your
          property — it&apos;s one of the highest-impact, lowest-cost home
          improvements you can make.
        </p>
        <p className="mt-4">
          We power wash residential and commercial surfaces including vinyl
          and wood siding, brick, concrete driveways and sidewalks, patios,
          decks, fences, garage floors, and building facades. We adjust
          pressure levels for each surface to ensure thorough cleaning without
          damage.
        </p>
        <p className="mt-4">
          We use eco-friendly cleaning solutions that are tough on mold,
          mildew, and stains but safe for your landscaping and pets. Power
          washing is also an essential prep step before exterior painting —
          we often bundle these services for the best results and value.
        </p>
      </>
    ),
    features: [
      {
        icon: 'Droplets',
        title: 'Adjustable Pressure',
        description:
          'We calibrate pressure for each surface type — gentle on wood and siding, powerful on concrete and brick.',
      },
      {
        icon: 'Leaf',
        title: 'Eco-Friendly Solutions',
        description:
          'Our cleaning solutions are biodegradable and safe for landscaping, pets, and the environment.',
      },
      {
        icon: 'Maximize',
        title: 'All Surface Types',
        description:
          'Siding, driveways, sidewalks, decks, patios, fences, garage floors — we clean it all.',
      },
      {
        icon: 'SprayCan',
        title: 'Pre-Paint Prep',
        description:
          'Power washing is step one before any exterior paint job. Bundle services for the best value.',
      },
      {
        icon: 'Home',
        title: 'Residential & Commercial',
        description:
          'From single driveways to entire building facades — we service both residential and commercial properties.',
      },
      {
        icon: 'Star',
        title: 'Instant Transformation',
        description:
          'See dramatic before-and-after results in hours. One of the fastest ways to boost curb appeal.',
      },
    ],
    process: [
      {
        title: 'Free Assessment',
        description:
          'We evaluate the surfaces to be cleaned, identify staining and mildew, and recommend the right approach.',
      },
      {
        title: 'Area Preparation',
        description:
          'We protect plants, cover electrical outlets, close windows, and move outdoor furniture as needed.',
      },
      {
        title: 'Professional Washing',
        description:
          'Using commercial-grade equipment and eco-friendly solutions, we thoroughly clean every surface.',
      },
      {
        title: 'Final Rinse & Inspection',
        description:
          'A final rinse removes all residue, and we inspect every area to ensure thorough results.',
      },
    ],
    pricing: {
      items: [
        { label: 'Power washing (per sq ft)', range: '$0.15 – $0.75' },
        { label: 'Driveway (2-car)', range: '$150 – $350' },
        { label: 'House siding', range: '$300 – $800' },
        { label: 'Deck / patio', range: '$150 – $500' },
      ],
      disclaimer:
        'Pricing depends on surface area, type of material, level of staining, and accessibility. We provide free on-site estimates.',
    },
    faqs: [
      {
        question: 'Will power washing damage my surfaces?',
        answer:
          'Not when done by professionals. We adjust pressure levels for each surface — lower for wood and siding, higher for concrete. We never use excessive pressure that could cause damage.',
      },
      {
        question: 'How often should I power wash my home?',
        answer:
          'Most homes benefit from annual power washing, typically in spring after winter grime has accumulated. North-facing surfaces may need it more often due to mildew.',
      },
      {
        question: 'Is it safe for my plants?',
        answer:
          'Yes. We use eco-friendly, biodegradable solutions and pre-wet landscaping before and after washing. We take care to protect your plants and gardens.',
      },
      {
        question: 'Can you remove graffiti?',
        answer:
          'In many cases, yes. Graffiti removal depends on the surface type and paint used. We use specialized solutions for graffiti when standard washing isn\'t enough.',
      },
    ],
    relatedSlugs: ['exterior-painting', 'gutter-cleaning', 'handyman'],
  },

  'gutter-cleaning': {
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    subtitle:
      'Keep your gutters clear and your home protected with seasonal cleaning. Critical for Chicago homes facing ice dams and heavy leaf buildup.',
    description: (
      <>
        <h2 className="heading-3 text-primary mb-4">
          Essential Gutter Cleaning for Chicago Homes
        </h2>
        <p>
          Clogged gutters are one of the most common — and most preventable
          — causes of water damage in Chicago homes. When gutters are blocked
          with leaves, debris, and dirt, water overflows and can damage your
          foundation, fascia boards, siding, landscaping, and basement.
        </p>
        <p className="mt-4">
          In Chicago, gutters face a double threat: heavy fall leaf buildup
          from mature neighborhood trees and winter ice dams from freeze-thaw
          cycles. We recommend cleaning gutters at least twice a year — once
          in late spring after pollen and seed pods, and once in late fall
          after leaves drop.
        </p>
        <p className="mt-4">
          Our gutter cleaning service includes removal of all debris, flushing
          downspouts to ensure clear drainage, inspecting for damage or
          loose fasteners, and checking for proper slope. We also clean gutter
          exteriors of staining when requested.
        </p>
      </>
    ),
    features: [
      {
        icon: 'Shield',
        title: 'Water Damage Prevention',
        description:
          'Clear gutters protect your foundation, fascia, siding, and basement from costly water damage.',
      },
      {
        icon: 'SunSnow',
        title: 'Ice Dam Prevention',
        description:
          'Clean gutters reduce ice dam formation in winter — a major cause of roof and interior damage in Chicago.',
      },
      {
        icon: 'CheckCircle2',
        title: 'Full Downspout Clearing',
        description:
          'We don\'t just clean the gutters — we flush and clear every downspout to ensure water flows freely.',
      },
      {
        icon: 'Eye',
        title: 'Damage Inspection',
        description:
          'We inspect for loose gutters, damaged hangers, rust, holes, and improper slope during every cleaning.',
      },
      {
        icon: 'CalendarDays',
        title: 'Seasonal Scheduling',
        description:
          'Sign up for spring and fall cleanings and we\'ll contact you when it\'s time — one less thing to worry about.',
      },
      {
        icon: 'AlertTriangle',
        title: 'Signs You Need Cleaning',
        description:
          'Overflowing water, sagging gutters, plants growing in gutters, staining on siding, or basement moisture.',
      },
    ],
    process: [
      {
        title: 'Safety Setup',
        description:
          'We set up professional ladders and safety equipment, protecting your landscaping and roof.',
      },
      {
        title: 'Debris Removal',
        description:
          'All leaves, twigs, dirt, and buildup are removed by hand and bagged for disposal.',
      },
      {
        title: 'Downspout Flushing',
        description:
          'Every downspout is flushed with water to ensure clear, unrestricted drainage from roof to ground.',
      },
      {
        title: 'Inspection & Report',
        description:
          'We inspect all gutters for damage, proper slope, and secure mounting. You receive a condition report.',
      },
    ],
    pricing: {
      items: [
        { label: 'Gutter cleaning (per linear ft)', range: '$1.00 – $2.50' },
        { label: 'Average home (150 linear ft)', range: '$150 – $375' },
        { label: 'Two-story home', range: '$200 – $500' },
        { label: 'Downspout unclogging (each)', range: '$50 – $100' },
      ],
      disclaimer:
        'Pricing depends on linear feet of gutters, number of stories, roof pitch, and amount of debris. Multi-story homes cost more due to ladder and safety requirements.',
    },
    faqs: [
      {
        question: 'How often should gutters be cleaned in Chicago?',
        answer:
          'At minimum twice per year — late spring and late fall. Homes near many trees may need 3-4 cleanings per year.',
      },
      {
        question: 'What are signs my gutters need cleaning?',
        answer:
          'Water overflowing during rain, sagging gutters, plants growing in the gutters, staining on siding below gutters, and moisture in the basement.',
      },
      {
        question: 'Do you repair damaged gutters?',
        answer:
          'We handle minor repairs like reattaching loose sections, sealing small leaks, and adjusting slope. For major replacement, we can recommend trusted contractors.',
      },
      {
        question: 'Do you offer recurring service?',
        answer:
          'Yes, we offer spring and fall maintenance plans. We\'ll contact you when it\'s time, so you never have to remember.',
      },
    ],
    relatedSlugs: ['power-washing', 'exterior-painting', 'handyman'],
  },

  handyman: {
    slug: 'handyman',
    title: 'Handyman Services',
    subtitle:
      'Drywall repair, carpentry, tile, and general home improvement. One call does it all — let us handle your to-do list.',
    description: (
      <>
        <h2 className="heading-3 text-primary mb-4">
          One Call Does It All
        </h2>
        <p>
          Sometimes you need more than just paint. A Clean Look offers
          full-service handyman work for Chicago homeowners who want a single,
          trusted contractor for all their home improvement needs. No job too
          small — from fixing a doorknob to remodeling a bathroom.
        </p>
        <p className="mt-4">
          Our handyman services include drywall repair and patching, minor
          carpentry work, tile installation and repair, window cleaning,
          faux finishing and decorative painting, minor electrical work,
          fixture installation, weatherstripping, and general repairs.
        </p>
        <p className="mt-4">
          We take the same care with handyman work as we do with painting —
          clean workmanship, transparent pricing, and a dedication to getting
          it right the first time. And because we handle painting too, we can
          seamlessly transition from repair work to a fresh coat of paint.
        </p>
      </>
    ),
    features: [
      {
        icon: 'Hammer',
        title: 'Drywall Repair',
        description:
          'Nail holes, dings, water damage, cracks — we patch, skim-coat, and smooth so walls look factory-new.',
      },
      {
        icon: 'Wrench',
        title: 'General Repairs',
        description:
          'Door adjustments, hardware replacement, weatherstripping, caulking, and all those small fixes that add up.',
      },
      {
        icon: 'BrickWall',
        title: 'Tile Work',
        description:
          'Backsplash installation, bathroom tile repair, grout replacement, and tile floor repairs.',
      },
      {
        icon: 'Blinds',
        title: 'Carpentry',
        description:
          'Trim installation and repair, shelving, crown molding, baseboard replacement, and minor woodwork.',
      },
      {
        icon: 'Palette',
        title: 'Faux Finishing',
        description:
          'Specialty painting techniques including faux finishes, accent walls, and decorative treatments.',
      },
      {
        icon: 'Zap',
        title: 'Minor Electrical',
        description:
          'Light fixture installation, outlet cover replacement, and minor electrical tasks.',
      },
    ],
    process: [
      {
        title: 'Tell Us What You Need',
        description:
          'Call or fill out our form with a description of the work. We can often give a ballpark over the phone.',
      },
      {
        title: 'On-Site Assessment',
        description:
          'For larger jobs, we visit to assess the scope and provide an accurate estimate with no surprises.',
      },
      {
        title: 'Professional Work',
        description:
          'Our skilled team completes the work efficiently and cleanly — treating your home with respect.',
      },
      {
        title: 'Inspection & Cleanup',
        description:
          'We clean up thoroughly and walk you through the completed work to make sure everything is right.',
      },
    ],
    pricing: {
      items: [
        { label: 'Handyman (per hour)', range: '$50 – $90' },
        { label: 'Drywall patch (small)', range: '$75 – $200' },
        { label: 'Faux painting (per sq ft)', range: '$2.24 – $4.48' },
        { label: 'Specialty / murals (per hour)', range: '$60 – $120' },
      ],
      disclaimer:
        'Pricing varies by project scope, materials required, and complexity. We provide estimates before starting work so there are no surprises.',
    },
    faqs: [
      {
        question: 'What handyman services do you offer?',
        answer:
          'Drywall repair, carpentry, tile work, faux finishing, minor electrical, fixture installation, window cleaning, caulking, weatherstripping, and general home repairs.',
      },
      {
        question: 'Is there a minimum charge?',
        answer:
          'We have a 2-hour minimum for handyman visits. We encourage bundling small tasks into one visit to make the most of the trip.',
      },
      {
        question: 'Can you do the repair work AND paint afterward?',
        answer:
          'Absolutely — that\'s one of our biggest advantages. We can patch drywall, do trim work, and then paint everything seamlessly. One contractor, one call.',
      },
      {
        question: 'Do you handle large renovation projects?',
        answer:
          'We focus on small to medium projects. For major renovations (kitchen remodels, room additions), we can recommend trusted partners and handle all the painting afterward.',
      },
    ],
    relatedSlugs: ['interior-painting', 'exterior-painting', 'power-washing'],
  },
}
