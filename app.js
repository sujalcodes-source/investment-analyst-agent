/* =================================================================
   SEQUENTIAL AI — AI INVESTMENT ANALYST
   JavaScript: js/app.js
   IBM SkillsBuild Hackathon — Sequential Task Agent

   TABLE OF CONTENTS
   1.  Company Data Store
   2.  DOM Ready Bootstrapper
   3.  Loading Screen
   4.  AOS Init
   5.  Navbar (sticky + mobile toggle + active link)
   6.  Hero Ticker
   7.  Typing Effect
   8.  Counter Animation
   9.  Company Analysis Engine
   10. Dashboard Updater
   11. Chart Factory (Chart.js)
   12. Chart Range Selector
   13. Competitor Table Highlighter
   14. Sentiment Progress Bars
   15. Risk Meter (SVG ring)
   16. AI Recommendation Display
   17. Progress Bar Animator
   18. Back to Top
   19. Contact Form Validation
   20. Toast Notification System
   21. Parallax / Mouse Effect
   22. IntersectionObserver (counters + progress bars)
   23. Footer Year
   24. Utility Helpers
   ================================================================= */

'use strict';

/* ================================================================= */
/* 1. COMPANY DATA STORE                                               */
/* ================================================================= */

const COMPANY_DATA = {
  Apple: {
    ticker: 'AAPL · NASDAQ',
    price: 198.45,
    marketCap: 3.05,
    marketCapUnit: 'T',
    revenue: 391.4,
    revenueUnit: 'B',
    netIncome: 97.3,
    netIncomeUnit: 'B',
    eps: 6.42,
    pe: 30.9,
    roe: 147.9,
    debtRatio: 1.45,
    profitMargin: 24.9,
    riskScore: 24,
    aiScore: 88,
    riskLevel: 'low',
    riskReason:
      'Strong free cash flow, low relative debt, and consistent margins keep the overall risk profile low, despite ordinary market volatility.',
    riskRecs: [
      'Suitable for long-term core holdings',
      'Monitor upcoming earnings guidance',
      'Watch supply chain and regulatory news',
    ],
    recommendation: 'BUY',
    growthPotential: 82,
    reasoning:
      'Consistent double-digit margins, an expanding services segment, and a fortress balance sheet outweigh near-term risks from a maturing smartphone cycle. The sequential analysis supports accumulating on weakness rather than waiting for a pullback.',
    strengths: [
      'Strong brand loyalty and ecosystem lock-in',
      'Robust free cash flow generation',
      'Industry-leading profit margins',
    ],
    weaknesses: [
      'High dependency on flagship product revenue',
      'Slower growth in saturated markets',
    ],
    opportunities: [
      'Expansion of services and wearables',
      'Growth in emerging markets',
      'AI integration across the product line',
    ],
    threats: [
      'Intensifying competition',
      'Regulatory scrutiny in major markets',
      'Global supply chain dependencies',
    ],
    sentiment: { positive: 62, neutral: 25, negative: 13 },
    sentimentTags: {
      positive: ['Earnings beat', 'Analyst upgrades'],
      neutral: ['Mixed guidance', 'Sector rotation'],
      negative: ['Margin pressure', 'Regulatory watch'],
    },
    stockPrices: {
      '1W': [191, 193, 195, 194, 196, 197, 198],
      '1M': [180, 182, 179, 185, 188, 190, 192, 191, 195, 197, 196, 198],
      '6M': [165, 170, 172, 168, 175, 180, 183, 185, 188, 190, 193, 198],
      '1Y': [140, 150, 155, 148, 162, 170, 165, 175, 180, 185, 192, 198],
    },
    revenues: [274.5, 294.0, 365.8, 394.3, 383.0, 391.4],
    profits: [57.4, 66.3, 94.7, 100.0, 96.9, 97.3],
  },
  Microsoft: {
    ticker: 'MSFT · NASDAQ',
    price: 415.2,
    marketCap: 3.15,
    marketCapUnit: 'T',
    revenue: 245.0,
    revenueUnit: 'B',
    netIncome: 88.0,
    netIncomeUnit: 'B',
    eps: 11.8,
    pe: 35.2,
    roe: 34.5,
    debtRatio: 0.72,
    profitMargin: 36.1,
    riskScore: 18,
    aiScore: 91,
    riskLevel: 'low',
    riskReason:
      'Azure cloud dominance, recurring subscription revenue, and strategic AI investment position Microsoft as a structurally low-risk enterprise holding.',
    riskRecs: [
      'Core holding for growth and stability balance',
      'AI partnership announcements remain a key catalyst',
      'Monitor antitrust proceedings in EU and US',
    ],
    recommendation: 'BUY',
    growthPotential: 88,
    reasoning:
      'Azure cloud momentum combined with OpenAI partnership synergies and enterprise software stickiness creates a compounding growth engine with predictable margins. Consensus among sequential AI steps is strongly positive.',
    strengths: [
      'Cloud market leadership via Azure',
      'Deep enterprise software moat',
      'AI-first product integration at scale',
    ],
    weaknesses: [
      'Premium valuation limits margin of safety',
      'Gaming segment profitability still maturing',
    ],
    opportunities: [
      'Copilot monetization across Office 365',
      'AI infrastructure spending boom',
      'Expansion in developing markets',
    ],
    threats: [
      'Google and AWS cloud competition',
      'Regulatory risk from acquisitions',
      'Economic slowdown reducing IT budgets',
    ],
    sentiment: { positive: 72, neutral: 20, negative: 8 },
    sentimentTags: {
      positive: ['Cloud growth', 'AI leadership'],
      neutral: ['Valuation concerns', 'Integration costs'],
      negative: ['Regulatory risk', 'Competition'],
    },
    stockPrices: {
      '1W': [408, 410, 412, 411, 413, 414, 415],
      '1M': [390, 395, 392, 400, 403, 405, 408, 407, 410, 412, 413, 415],
      '6M': [340, 355, 362, 370, 380, 388, 393, 398, 403, 408, 412, 415],
      '1Y': [280, 300, 315, 325, 340, 355, 365, 375, 385, 395, 408, 415],
    },
    revenues: [143.0, 168.1, 198.3, 211.9, 227.6, 245.0],
    profits: [44.3, 61.3, 72.7, 72.4, 82.0, 88.0],
  },
  Google: {
    ticker: 'GOOGL · NASDAQ',
    price: 178.6,
    marketCap: 2.15,
    marketCapUnit: 'T',
    revenue: 307.0,
    revenueUnit: 'B',
    netIncome: 73.0,
    netIncomeUnit: 'B',
    eps: 5.8,
    pe: 24.1,
    roe: 28.6,
    debtRatio: 0.38,
    profitMargin: 23.9,
    riskScore: 32,
    aiScore: 79,
    riskLevel: 'low',
    riskReason:
      'Search advertising dominance provides stable cash flows, though AI competition from OpenAI and antitrust decisions introduce medium-term uncertainty.',
    riskRecs: [
      'Attractive valuation relative to mega-cap peers',
      'Track Gemini AI product traction closely',
      'Monitor DOJ antitrust ruling impact on search distribution',
    ],
    recommendation: 'BUY',
    growthPotential: 74,
    reasoning:
      'A compelling PE discount versus peers, a resurgent YouTube, and Cloud momentum give Google multiple ways to win. The DOJ overhang is real but widely priced in at current levels.',
    strengths: [
      'Dominant search and advertising network',
      'Cloud computing growth trajectory',
      'Strong AI research and infrastructure',
    ],
    weaknesses: [
      'Heavy reliance on advertising revenue',
      'Slower monetization of new AI products',
    ],
    opportunities: [
      'Gemini AI embedding across all products',
      'YouTube Shorts and subscription growth',
      'Cloud catching AWS and Azure',
    ],
    threats: [
      'DOJ antitrust action on search',
      'AI search disruption to core business',
      'Ad spending cyclicality in recession',
    ],
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    sentimentTags: {
      positive: ['Cloud growth', 'AI investment'],
      neutral: ['Legal proceedings', 'Transition period'],
      negative: ['Antitrust risk', 'AI competition'],
    },
    stockPrices: {
      '1W': [172, 174, 175, 176, 177, 178, 178.6],
      '1M': [162, 164, 168, 166, 170, 172, 173, 174, 175, 176, 178, 178.6],
      '6M': [140, 148, 152, 155, 160, 163, 166, 170, 173, 175, 177, 178.6],
      '1Y': [105, 115, 120, 128, 135, 142, 150, 158, 165, 170, 175, 178.6],
    },
    revenues: [182.5, 196.0, 257.6, 282.8, 305.0, 307.0],
    profits: [40.3, 76.0, 60.0, 73.8, 73.9, 73.0],
  },
  Tesla: {
    ticker: 'TSLA · NASDAQ',
    price: 247.5,
    marketCap: 0.85,
    marketCapUnit: 'T',
    revenue: 97.0,
    revenueUnit: 'B',
    netIncome: 7.9,
    netIncomeUnit: 'B',
    eps: 2.48,
    pe: 68.4,
    roe: 8.2,
    debtRatio: 0.61,
    profitMargin: 8.1,
    riskScore: 67,
    aiScore: 55,
    riskLevel: 'high',
    riskReason:
      'Margin compression from price cuts, intense EV competition, and CEO distraction create a high-risk, high-optionality profile unsuitable for risk-averse portfolios.',
    riskRecs: [
      'Limit position size due to high volatility',
      'Monitor gross margin trajectory closely',
      'Robotaxi and energy storage are key optionality drivers',
    ],
    recommendation: 'HOLD',
    growthPotential: 60,
    reasoning:
      'Tesla\'s energy storage and FSD monetization are genuine long-term optionalities, but the current valuation requires near-perfect execution. Hold existing positions and wait for margin recovery confirmation before adding.',
    strengths: [
      'Supercharger network and energy ecosystem',
      'Brand recognition and early-mover advantage',
      'Technology lead in battery and software',
    ],
    weaknesses: [
      'Margin compression from price wars',
      'Key-person risk and CEO distraction',
    ],
    opportunities: [
      'Robotaxi network commercial launch',
      'Energy storage secular growth',
      'Global EV adoption acceleration',
    ],
    threats: [
      'BYD and Chinese EV competition',
      'Subsidy policy changes',
      'Consumer sentiment and brand risk',
    ],
    sentiment: { positive: 38, neutral: 32, negative: 30 },
    sentimentTags: {
      positive: ['FSD progress', 'Energy growth'],
      neutral: ['Price cuts', 'Market share'],
      negative: ['Margin decline', 'Competition'],
    },
    stockPrices: {
      '1W': [240, 243, 245, 244, 246, 247, 247.5],
      '1M': [220, 225, 228, 232, 235, 237, 240, 242, 244, 245, 246, 247.5],
      '6M': [175, 185, 190, 200, 210, 215, 220, 225, 230, 237, 243, 247.5],
      '1Y': [120, 140, 155, 165, 175, 185, 195, 210, 220, 230, 242, 247.5],
    },
    revenues: [53.8, 81.5, 96.8, 81.7, 97.7, 97.0],
    profits: [5.6, 12.6, 14.9, 2.5, 7.1, 7.9],
  },
  Amazon: {
    ticker: 'AMZN · NASDAQ',
    price: 193.8,
    marketCap: 2.0,
    marketCapUnit: 'T',
    revenue: 590.0,
    revenueUnit: 'B',
    netIncome: 30.0,
    netIncomeUnit: 'B',
    eps: 2.9,
    pe: 40.7,
    roe: 18.4,
    debtRatio: 1.1,
    profitMargin: 5.1,
    riskScore: 38,
    aiScore: 73,
    riskLevel: 'medium',
    riskReason:
      'AWS acceleration and advertising momentum offset thin e-commerce margins. Macro sensitivity in consumer spending remains a watchable risk.',
    riskRecs: [
      'AWS segment profitability is the key metric to track',
      'Advertising revenue growth provides durable upside',
      'Monitor capital expenditure commitments to AI infrastructure',
    ],
    recommendation: 'BUY',
    growthPotential: 70,
    reasoning:
      'AWS re-acceleration, a fast-growing advertising business, and operational efficiency gains create a compelling setup. E-commerce thin margins are offset by the high-margin segments driving the consolidated P&L.',
    strengths: [
      'AWS market leadership in cloud',
      'Fastest-growing advertising platform',
      'Unmatched logistics and fulfillment network',
    ],
    weaknesses: [
      'Thin e-commerce margins pressure overall profitability',
      'Heavy capex burden from AI infrastructure',
    ],
    opportunities: [
      'AI services via AWS Bedrock',
      'International e-commerce expansion',
      'Healthcare and grocery verticals',
    ],
    threats: [
      'Microsoft Azure and Google Cloud competition',
      'Regulatory scrutiny on marketplace practices',
      'Consumer spending slowdown',
    ],
    sentiment: { positive: 58, neutral: 28, negative: 14 },
    sentimentTags: {
      positive: ['AWS growth', 'Advertising boom'],
      neutral: ['Capex concerns', 'Margin trajectory'],
      negative: ['Competition', 'Consumer weakness'],
    },
    stockPrices: {
      '1W': [188, 189, 191, 192, 192, 193, 193.8],
      '1M': [175, 178, 180, 182, 184, 186, 188, 189, 190, 192, 193, 193.8],
      '6M': [155, 160, 163, 168, 172, 175, 178, 182, 185, 188, 191, 193.8],
      '1Y': [100, 115, 125, 135, 145, 155, 162, 170, 178, 184, 190, 193.8],
    },
    revenues: [386.1, 469.8, 513.9, 554.0, 574.8, 590.0],
    profits: [21.3, 33.4, -2.7, 30.4, 36.9, 30.0],
  },
  NVIDIA: {
    ticker: 'NVDA · NASDAQ',
    price: 875.4,
    marketCap: 2.16,
    marketCapUnit: 'T',
    revenue: 79.8,
    revenueUnit: 'B',
    netIncome: 42.6,
    netIncomeUnit: 'B',
    eps: 17.2,
    pe: 50.9,
    roe: 119.0,
    debtRatio: 0.44,
    profitMargin: 53.4,
    riskScore: 42,
    aiScore: 92,
    riskLevel: 'medium',
    riskReason:
      'Extraordinary margins and AI infrastructure dominance are partially offset by concentration risk — over 40% of revenue comes from a handful of hyperscaler customers.',
    riskRecs: [
      'AI infrastructure demand remains the most important macro factor',
      'Watch customer diversification beyond the hyperscalers',
      'Export control risks to China remain an ongoing watch item',
    ],
    recommendation: 'BUY',
    growthPotential: 90,
    reasoning:
      'NVIDIA\'s data center dominance is structural, not cyclical. Blackwell GPU demand continues to outstrip supply, and the software moat through CUDA is extremely difficult to replicate. Premium valuation is justified by the growth trajectory.',
    strengths: [
      'GPU monopoly for AI training workloads',
      'CUDA software ecosystem lock-in',
      'Blackwell architecture demand cycle',
    ],
    weaknesses: [
      'Extreme customer concentration risk',
      'China revenue exposure to export controls',
    ],
    opportunities: [
      'Sovereign AI buildout globally',
      'Inference chip demand secular growth',
      'Robotics and autonomous vehicle compute',
    ],
    threats: [
      'Custom chip development by Google and Amazon',
      'US-China trade restrictions',
      'Potential demand normalization post-build cycle',
    ],
    sentiment: { positive: 78, neutral: 14, negative: 8 },
    sentimentTags: {
      positive: ['AI demand surge', 'Earnings beats'],
      neutral: ['Valuation debate', 'Supply constraints'],
      negative: ['China risk', 'Competition building'],
    },
    stockPrices: {
      '1W': [862, 865, 868, 870, 872, 874, 875.4],
      '1M': [820, 825, 830, 840, 845, 850, 855, 860, 865, 868, 872, 875.4],
      '6M': [650, 680, 700, 720, 745, 765, 785, 805, 825, 845, 862, 875.4],
      '1Y': [380, 430, 480, 530, 580, 620, 660, 700, 740, 780, 830, 875.4],
    },
    revenues: [16.7, 26.9, 44.9, 60.9, 71.5, 79.8],
    profits: [4.4, 9.8, 29.8, 44.9, 42.3, 42.6],
  },
  Reliance: {
    ticker: 'RELIANCE · NSE',
    price: 2974.5,
    pricePrefix: '₹',
    marketCap: 20.1,
    marketCapUnit: 'T',
    marketCapPrefix: '₹',
    revenue: 9.0,
    revenueUnit: 'T',
    revenuePrefix: '₹',
    netIncome: 0.68,
    netIncomeUnit: 'T',
    netIncomePrefix: '₹',
    eps: 100.4,
    epsPrefix: '₹',
    pe: 29.6,
    roe: 9.8,
    debtRatio: 1.15,
    profitMargin: 7.6,
    riskScore: 35,
    aiScore: 67,
    riskLevel: 'medium',
    riskReason:
      'Diversified conglomerate structure reduces single-segment risk, but debt levels and retail segment margin pressure are worth monitoring in a rising rate environment.',
    riskRecs: [
      'Jio Financial Services demerger creates fresh value unlocking',
      'Track O2C segment profitability in volatile crude environment',
      'Retail and digital services remain structural growth pillars',
    ],
    recommendation: 'HOLD',
    growthPotential: 58,
    reasoning:
      'Reliance\'s diversification across telecom, retail, and petrochemicals provides a durable base, but near-term catalysts are limited. Hold at current levels and accumulate on dips below ₹2700.',
    strengths: [
      'India\'s largest conglomerate with diversified cash flows',
      'Jio dominates Indian telecom market',
      'Strong political and regulatory relationships',
    ],
    weaknesses: [
      'Heavy debt load from capital-intensive expansion',
      'Thin margins in retail segment',
    ],
    opportunities: [
      'Digital services and fintech monetization',
      'Retail expansion into tier-2 and tier-3 cities',
      'Green energy transition investments',
    ],
    threats: [
      'Rising competition in telecom from Bharti Airtel',
      'Global crude price volatility affecting O2C margins',
      'Regulatory changes in telecom tariff structure',
    ],
    sentiment: { positive: 50, neutral: 32, negative: 18 },
    sentimentTags: {
      positive: ['Jio ARPU growth', 'Retail expansion'],
      neutral: ['Debt concerns', 'Crude volatility'],
      negative: ['Margin pressure', 'Competition'],
    },
    stockPrices: {
      '1W': [2940, 2950, 2958, 2960, 2965, 2970, 2974.5],
      '1M': [2850, 2870, 2880, 2895, 2910, 2920, 2930, 2940, 2950, 2960, 2968, 2974.5],
      '6M': [2700, 2720, 2740, 2760, 2780, 2810, 2840, 2870, 2900, 2930, 2958, 2974.5],
      '1Y': [2400, 2480, 2520, 2570, 2620, 2680, 2720, 2770, 2820, 2880, 2940, 2974.5],
    },
    revenues: [6.59, 7.92, 8.79, 9.74, 8.97, 9.0],
    profits: [0.49, 0.60, 0.67, 0.73, 0.69, 0.68],
  },
  TCS: {
    ticker: 'TCS · NSE',
    price: 3862.3,
    pricePrefix: '₹',
    marketCap: 14.1,
    marketCapUnit: 'T',
    marketCapPrefix: '₹',
    revenue: 0.24,
    revenueUnit: 'T',
    revenuePrefix: '₹',
    netIncome: 46900,
    netIncomeUnit: 'Cr',
    netIncomePrefix: '₹',
    eps: 127.4,
    epsPrefix: '₹',
    pe: 30.3,
    roe: 53.4,
    debtRatio: 0.12,
    profitMargin: 19.5,
    riskScore: 22,
    aiScore: 82,
    riskLevel: 'low',
    riskReason:
      'Near-zero debt, resilient IT services demand, and a consistent dividend track record make TCS one of the lowest-risk large-cap holdings in the Indian market.',
    riskRecs: [
      'Dollar revenue growth is the primary metric to track',
      'BFSI vertical recovery could be a significant catalyst',
      'Attrition trends normalize — retain a close watch',
    ],
    recommendation: 'BUY',
    growthPotential: 72,
    reasoning:
      'TCS\'s diversified geography, strong BFSI client relationships, and AI/GenAI services ramp-up position it well for the next IT spending cycle. Current valuation is fair for the quality of the franchise.',
    strengths: [
      'Debt-free balance sheet with strong free cash flow',
      'Diversified client base across 45+ countries',
      'Consistent and growing dividend returns',
    ],
    weaknesses: [
      'Revenue growth moderated from post-COVID highs',
      'High wage inflation in Indian IT market',
    ],
    opportunities: [
      'GenAI services and cloud migration mandates',
      'BFSI digital transformation wave',
      'Expansion in continental Europe',
    ],
    threats: [
      'US immigration policy affecting talent deployment',
      'Protectionist regulations in key markets',
      'Competition from Infosys, Wipro, and global IT firms',
    ],
    sentiment: { positive: 60, neutral: 28, negative: 12 },
    sentimentTags: {
      positive: ['Deal wins', 'Margin stability'],
      neutral: ['Growth moderation', 'Macro caution'],
      negative: ['Wage inflation', 'Currency headwinds'],
    },
    stockPrices: {
      '1W': [3820, 3830, 3840, 3845, 3850, 3858, 3862.3],
      '1M': [3720, 3740, 3755, 3770, 3780, 3790, 3800, 3810, 3820, 3840, 3855, 3862.3],
      '6M': [3500, 3540, 3570, 3600, 3630, 3660, 3700, 3730, 3760, 3800, 3840, 3862.3],
      '1Y': [3200, 3280, 3320, 3380, 3420, 3480, 3540, 3600, 3680, 3740, 3810, 3862.3],
    },
    revenues: [0.191, 0.198, 0.223, 0.227, 0.240, 0.240],
    profits: [38983, 40135, 45908, 46099, 47075, 46900],
  },
  Infosys: {
    ticker: 'INFY · NSE',
    price: 1842.5,
    pricePrefix: '₹',
    marketCap: 7.7,
    marketCapUnit: 'T',
    marketCapPrefix: '₹',
    revenue: 1613.0,
    revenueUnit: 'Bn',
    revenuePrefix: '₹',
    netIncome: 268.2,
    netIncomeUnit: 'Bn',
    netIncomePrefix: '₹',
    eps: 64.3,
    epsPrefix: '₹',
    pe: 28.7,
    roe: 32.5,
    debtRatio: 0.21,
    profitMargin: 16.6,
    riskScore: 28,
    aiScore: 75,
    riskLevel: 'low',
    riskReason:
      'Conservative balance sheet, improving deal pipeline, and Cobalt cloud platform uptake mitigate risk. Attrition normalization reduces talent cost volatility.',
    riskRecs: [
      'Large deal total contract value (TCV) is the leading indicator to watch',
      'Topaz AI platform commercialisation timeline is a key variable',
      'Monitor US financial services client discretionary spend',
    ],
    recommendation: 'BUY',
    growthPotential: 65,
    reasoning:
      'Infosys is recovering from a rough FY23 patch and the revised revenue guidance band trending upward signals confidence. Topaz AI platform and large deal wins position it well for sustained re-rating.',
    strengths: [
      'Strong digital and cloud transformation capability',
      'Growing large deal pipeline and TCV',
      'Improving EBIT margins through operational efficiency',
    ],
    weaknesses: [
      'Revenue growth has lagged TCS in recent quarters',
      'Geographic concentration in North America',
    ],
    opportunities: [
      'Topaz GenAI platform commercial traction',
      'Manufacturing and energy vertical expansion',
      'European market share gains',
    ],
    threats: [
      'Visa restrictions affecting onsite delivery',
      'Client budget cuts in US BFSI segment',
      'TCS and Accenture competition on large deals',
    ],
    sentiment: { positive: 55, neutral: 30, negative: 15 },
    sentimentTags: {
      positive: ['Deal wins', 'AI platform'],
      neutral: ['Revenue guidance', 'Macro uncertainty'],
      negative: ['Growth lag', 'Attrition'],
    },
    stockPrices: {
      '1W': [1810, 1818, 1825, 1828, 1832, 1838, 1842.5],
      '1M': [1740, 1755, 1768, 1775, 1785, 1795, 1805, 1812, 1820, 1830, 1838, 1842.5],
      '6M': [1550, 1580, 1605, 1630, 1660, 1685, 1705, 1725, 1745, 1770, 1810, 1842.5],
      '1Y': [1300, 1360, 1400, 1445, 1490, 1540, 1580, 1620, 1670, 1720, 1780, 1842.5],
    },
    revenues: [1296.5, 1338.7, 1462.8, 1479.1, 1586.4, 1613.0],
    profits: [202.5, 222.1, 246.5, 248.9, 264.3, 268.2],
  },
};

/* ================================================================= */
/* 24. UTILITY HELPERS                                                  */
/* ================================================================= */

/**
 * Select a single DOM element.
 * @param {string} selector
 * @param {Element|Document} [ctx=document]
 */
function qs(selector, ctx = document) {
  return ctx.querySelector(selector);
}

/**
 * Select multiple DOM elements as an Array.
 * @param {string} selector
 * @param {Element|Document} [ctx=document]
 */
function qsa(selector, ctx = document) {
  return Array.from(ctx.querySelectorAll(selector));
}

/**
 * Eased counter animation.
 * @param {Element} el   Target element — reads data-count, data-decimals, data-prefix, data-suffix
 * @param {number}  duration
 */
function animateCounter(el, duration = 1800) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals ?? '0', 10);
  const prefix = el.dataset.prefix ?? '';
  const suffix = el.dataset.suffix ?? '';
  const start = performance.now();

  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out-cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = (target * eased).toFixed(decimals);
    el.textContent = prefix + value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/**
 * Animate a progress bar width.
 * @param {Element} bar    Element with data-percent attribute
 * @param {number}  delay  ms before animation starts
 */
function animateProgressBar(bar, delay = 0) {
  const pct = parseFloat(bar.dataset.percent ?? '0');
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.transition = 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    bar.style.width = pct + '%';
  }, delay);
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'info'|'success'|'error'} [type='info']
 * @param {number} [duration=4000] ms
 */
function showToast(message, type = 'info', duration = 4000) {
  const container = qs('#toast-container');
  if (!container) return;

  const icons = { info: 'fa-circle-info', success: 'fa-circle-check', error: 'fa-circle-xmark' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<i class="fa-solid ${icons[type] ?? icons.info}"></i><span>${message}</span>`;
  container.appendChild(toast);

  const remove = () => {
    toast.classList.add('removing');
    toast.addEventListener('animationend', () => toast.remove(), { once: true });
  };

  const timer = setTimeout(remove, duration);
  toast.addEventListener('click', () => { clearTimeout(timer); remove(); });
}

/* ================================================================= */
/* 3. LOADING SCREEN                                                    */
/* ================================================================= */

function initLoadingScreen() {
  const screen = qs('#loading-screen');
  const bar = qs('#loader-progress-bar');
  if (!screen) return;

  document.documentElement.classList.add('is-loading');

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 22;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    if (bar) bar.style.width = Math.min(progress, 100) + '%';
  }, 180);

  const hide = () => {
    clearInterval(interval);
    if (bar) bar.style.width = '100%';
    setTimeout(() => {
      screen.classList.add('loaded');
      document.documentElement.classList.remove('is-loading');
      screen.addEventListener('transitionend', () => screen.remove(), { once: true });
    }, 280);
  };

  if (document.readyState === 'complete') {
    setTimeout(hide, 1200);
  } else {
    window.addEventListener('load', () => setTimeout(hide, 700), { once: true });
  }
}

/* ================================================================= */
/* 4. AOS INIT                                                          */
/* ================================================================= */

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 680,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }
}

/* ================================================================= */
/* 5. NAVBAR                                                            */
/* ================================================================= */

function initNavbar() {
  const navbar = qs('#navbar');
  const toggle = qs('#navbar-toggle');
  const links = qs('#navbar-links');
  if (!navbar) return;

  // Sticky class on scroll
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNavLink();
    toggleBackToTop();
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('active');
      toggle.classList.toggle('active', isOpen);
      toggle.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on nav link click (mobile)
    qsa('.nav-link', links).forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function updateActiveNavLink() {
  const sections = qsa('section[id], div[id]').filter(el =>
    qs(`[data-nav="${el.id}"]`)
  );

  let currentId = '';
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top <= 140) currentId = section.id;
  });

  qsa('.nav-link').forEach(link => {
    const isActive = link.dataset.nav === currentId;
    link.classList.toggle('active', isActive);
  });
}

/* ================================================================= */
/* 6. HERO TICKER                                                       */
/* ================================================================= */

function initTicker() {
  const track = qs('#ticker-track');
  if (!track) return;

  const tickers = [
    { symbol: 'AAPL', price: '198.45', change: '+1.23%', dir: 'up' },
    { symbol: 'MSFT', price: '415.20', change: '+0.85%', dir: 'up' },
    { symbol: 'NVDA', price: '875.40', change: '+2.14%', dir: 'up' },
    { symbol: 'GOOGL', price: '178.60', change: '-0.42%', dir: 'down' },
    { symbol: 'TSLA', price: '247.50', change: '-1.18%', dir: 'down' },
    { symbol: 'AMZN', price: '193.80', change: '+0.63%', dir: 'up' },
    { symbol: 'TCS', price: '₹3862', change: '+0.54%', dir: 'up' },
    { symbol: 'INFY', price: '₹1842', change: '+0.91%', dir: 'up' },
    { symbol: 'RELIANCE', price: '₹2974', change: '-0.30%', dir: 'down' },
    { symbol: 'META', price: '508.30', change: '+1.45%', dir: 'up' },
    { symbol: 'BRK.B', price: '399.60', change: '+0.20%', dir: 'up' },
    { symbol: 'JPM', price: '212.40', change: '-0.55%', dir: 'down' },
  ];

  // Duplicate items for seamless infinite scroll
  const all = [...tickers, ...tickers];
  track.innerHTML = all
    .map(
      t => `
    <span class="ticker-item ${t.dir}">
      <span class="ticker-symbol">${t.symbol}</span>
      <span>${t.price}</span>
      <span>${t.change}</span>
    </span>`
    )
    .join('');
}

/* ================================================================= */
/* 7. TYPING EFFECT                                                     */
/* ================================================================= */

function initTypingEffect() {
  const el = qs('#typing-text');
  if (!el) return;

  const lines = [
    '> Analyzing AAPL financial data...',
    '> Extracting key performance indicators...',
    '> Calculating PE, ROE, margin ratios...',
    '> Benchmarking against 4 competitors...',
    '> Reading market sentiment signals...',
    '> Risk score: LOW — 24 / 100',
    '> AI Recommendation: BUY ✓',
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let pauseTicks = 0;

  function type() {
    const current = lines[lineIdx];

    if (pauseTicks > 0) {
      pauseTicks--;
      setTimeout(type, 80);
      return;
    }

    if (!isDeleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        pauseTicks = 28; // pause at end
      }
      setTimeout(type, 45);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        pauseTicks = 6;
      }
      setTimeout(type, 22);
    }
  }

  setTimeout(type, 2000); // start after loader fade
}

/* ================================================================= */
/* 8. COUNTER ANIMATION (via IntersectionObserver)                     */
/* ================================================================= */

function initCounterObserver() {
  const counters = qsa('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  counters.forEach(el => observer.observe(el));
}

/* ================================================================= */
/* 9. COMPANY ANALYSIS ENGINE                                           */
/* ================================================================= */

let currentCompany = null;

function initAnalysisEngine() {
  const analyzeBtn = qs('#analyze-btn');
  const searchInput = qs('#company-search-input');
  const quickPicks = qsa('.quick-pick');

  if (!analyzeBtn) return;

  // Quick pick buttons
  quickPicks.forEach(btn => {
    btn.addEventListener('click', () => {
      const company = btn.dataset.company;
      if (searchInput) searchInput.value = company;
      quickPicks.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      runAnalysis(company);
    });
  });

  // Main analyze button
  analyzeBtn.addEventListener('click', () => {
    const val = searchInput?.value.trim() ?? '';
    const company = findCompany(val);
    if (company) {
      runAnalysis(company);
    } else {
      showToast('Company not found. Try Apple, Tesla, TCS...', 'error');
    }
  });

  // Enter key in search
  if (searchInput) {
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') analyzeBtn.click();
    });
  }
}

/** Match a user's string to a COMPANY_DATA key (case-insensitive) */
function findCompany(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  return Object.keys(COMPANY_DATA).find(k => k.toLowerCase() === q) ?? null;
}

/** Full sequential analysis run */
function runAnalysis(companyName) {
  const data = COMPANY_DATA[companyName];
  if (!data) return;

  currentCompany = companyName;

  // Highlight correct quick pick
  qsa('.quick-pick').forEach(b => {
    b.classList.toggle('active', b.dataset.company === companyName);
  });

  // Show a processing toast
  showToast(`Running sequential analysis on ${companyName}...`, 'info', 2800);

  setTimeout(() => {
    updateAnalysisResult(companyName, data);
    updateDashboard(data);
    updateCharts(companyName, data);
    updateSentiment(data);
    updateRiskMeter(data);
    updateRecommendation(data);
    showToast(`${companyName} analysis complete — 9 steps done ✓`, 'success');
  }, 900);
}

function updateAnalysisResult(companyName, data) {
  const empty = qs('#analysis-empty');
  const result = qs('#analysis-result');
  if (!empty || !result) return;

  empty.classList.add('hidden');
  result.classList.remove('hidden');

  // Avatar letter
  const avatar = qs('#ar-avatar');
  if (avatar) {
    avatar.textContent = companyName[0].toUpperCase();
  }

  // Name & ticker
  setText('#ar-company-name', companyName + ' Corp.');
  setText('#ar-ticker', data.ticker);

  // Metrics — update data-count so the counter observer re-triggers
  setCounter('#ar-price', data.price, 2, data.pricePrefix ?? '$', '');
  setCounter('#ar-marketcap', data.marketCap, 2, data.marketCapPrefix ?? '$', data.marketCapUnit ?? 'T');
  setCounter('#ar-revenue', data.revenue, 1, data.revenuePrefix ?? '$', data.revenueUnit ?? 'B');
  setCounter('#ar-netincome', data.netIncome, 1, data.netIncomePrefix ?? '$', data.netIncomeUnit ?? 'B');
  setCounter('#ar-eps', data.eps, 2, data.epsPrefix ?? '$', '');
  setCounter('#ar-pe', data.pe, 1, '', '');
  setCounter('#ar-roe', data.roe, 1, '', '%');
  setCounter('#ar-debt', data.debtRatio, 2, '', 'x');
  setCounter('#ar-margin', data.profitMargin, 1, '', '%');

  // Re-animate all counters inside the result
  qsa('[data-count]', result).forEach(el => {
    el.dataset.animated = '';
    animateCounter(el, 1400);
  });
}

function updateDashboard(data) {
  setCounter('#dash-price', data.price, 2, data.pricePrefix ?? '$', '');
  setCounter('#dash-revenue', data.revenue, 1, data.revenuePrefix ?? '$', data.revenueUnit ?? 'B');
  setCounter('#dash-netprofit', data.netIncome, 1, data.netIncomePrefix ?? '$', data.netIncomeUnit ?? 'B');
  setCounter('#dash-marketcap', data.marketCap, 2, data.marketCapPrefix ?? '$', data.marketCapUnit ?? 'T');
  setCounter('#dash-pe', data.pe, 1, '', '');
  setCounter('#dash-roe', data.roe, 1, '', '%');
  setCounter('#dash-riskscore', data.riskScore, 0, '', '/100');
  setCounter('#dash-aiscore', data.aiScore, 0, '', '/100');

  // Re-animate dashboard counters
  qsa('#dashboard [data-count]').forEach(el => {
    el.dataset.animated = '';
    animateCounter(el, 1400);
  });
}

/** Helper: Set data-* attributes and text content on a counter element */
function setCounter(selector, count, decimals, prefix, suffix) {
  const el = qs(selector);
  if (!el) return;
  el.dataset.count = count;
  el.dataset.decimals = decimals;
  el.dataset.prefix = prefix;
  el.dataset.suffix = suffix;
  el.textContent = prefix + (0).toFixed(decimals) + suffix;
}

function setText(selector, text) {
  const el = qs(selector);
  if (el) el.textContent = text;
}

/* ================================================================= */
/* 11. CHART FACTORY                                                    */
/* ================================================================= */

const CHART_DEFAULTS = {
  color: {
    primary: 'rgba(37, 99, 235, 1)',
    primaryAlpha: 'rgba(37, 99, 235, 0.15)',
    accent: 'rgba(56, 189, 248, 1)',
    accentAlpha: 'rgba(56, 189, 248, 0.15)',
    success: 'rgba(34, 197, 94, 1)',
    successAlpha: 'rgba(34, 197, 94, 0.15)',
    warning: 'rgba(250, 204, 21, 1)',
    warningAlpha: 'rgba(250, 204, 21, 0.15)',
    danger: 'rgba(239, 68, 68, 1)',
    dangerAlpha: 'rgba(239, 68, 68, 0.15)',
    muted: 'rgba(148, 163, 184, 0.65)',
    grid: 'rgba(255, 255, 255, 0.06)',
  },
};

let charts = {};
let currentRange = '1M';

function getChartOptions(type = 'line') {
  const base = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 800, easing: 'easeOutCubic' },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(248, 250, 252, 0.75)',
          font: { family: "'Inter', sans-serif", size: 11 },
          padding: 16,
          boxWidth: 12,
          boxHeight: 12,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        titleColor: '#F8FAFC',
        bodyColor: 'rgba(148, 163, 184, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        titleFont: { family: "'Poppins', sans-serif", weight: '600', size: 12 },
        bodyFont: { family: "'Inter', sans-serif", size: 11 },
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: { color: CHART_DEFAULTS.color.grid, drawBorder: false },
        ticks: {
          color: CHART_DEFAULTS.color.muted,
          font: { family: "'Inter', sans-serif", size: 10 },
        },
        border: { display: false },
      },
      y: {
        grid: { color: CHART_DEFAULTS.color.grid, drawBorder: false },
        ticks: {
          color: CHART_DEFAULTS.color.muted,
          font: { family: "'Inter', sans-serif", size: 10 },
        },
        border: { display: false },
      },
    } : {},
  };
  return base;
}

function generateStockLabels(range) {
  const now = new Date();
  const labels = [];
  const counts = { '1W': 7, '1M': 12, '6M': 12, '1Y': 12 };
  const n = counts[range] ?? 12;

  if (range === '1W') {
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
    }
  } else if (range === '1M') {
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 2.5);
      labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
  } else {
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setMonth(d.getMonth() - i);
      labels.push(d.toLocaleDateString('en-US', { month: 'short', year: range === '1Y' ? '2-digit' : undefined }));
    }
  }
  return labels;
}

function initCharts() {
  Chart.defaults.color = 'rgba(148, 163, 184, 0.8)';
  Chart.defaults.font.family = "'Inter', sans-serif";

  const defaultData = COMPANY_DATA['Apple'];

  // 1. Stock Price Chart
  const stockCtx = qs('#stockPriceChart');
  if (stockCtx) {
    const labels = generateStockLabels('1M');
    const prices = defaultData.stockPrices['1M'];
    charts.stock = new Chart(stockCtx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Stock Price',
          data: prices,
          borderColor: CHART_DEFAULTS.color.accent,
          backgroundColor: createGradient(stockCtx, CHART_DEFAULTS.color.accent, 'rgba(56, 189, 248, 0)'),
          borderWidth: 2.5,
          fill: true,
          tension: 0.45,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: CHART_DEFAULTS.color.accent,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
        }],
      },
      options: {
        ...getChartOptions('line'),
        interaction: { mode: 'index', intersect: false },
      },
    });
  }

  // 2. Revenue Trend
  const revCtx = qs('#revenueChart');
  if (revCtx) {
    charts.revenue = new Chart(revCtx, {
      type: 'bar',
      data: {
        labels: ['FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24'],
        datasets: [{
          label: 'Revenue',
          data: defaultData.revenues,
          backgroundColor: createGradient(revCtx, CHART_DEFAULTS.color.primary, 'rgba(37,99,235,0.1)', true),
          borderColor: CHART_DEFAULTS.color.primary,
          borderWidth: 1.5,
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: getChartOptions('bar'),
    });
  }

  // 3. Profit Trend
  const profCtx = qs('#profitChart');
  if (profCtx) {
    charts.profit = new Chart(profCtx, {
      type: 'line',
      data: {
        labels: ['FY19', 'FY20', 'FY21', 'FY22', 'FY23', 'FY24'],
        datasets: [{
          label: 'Net Profit',
          data: defaultData.profits,
          borderColor: CHART_DEFAULTS.color.success,
          backgroundColor: createGradient(profCtx, CHART_DEFAULTS.color.success, 'rgba(34,197,94,0)'),
          borderWidth: 2.5,
          fill: true,
          tension: 0.45,
          pointRadius: 3,
          pointBackgroundColor: CHART_DEFAULTS.color.success,
        }],
      },
      options: getChartOptions('line'),
    });
  }

  // 4. Sentiment Doughnut
  const sentCtx = qs('#sentimentChart');
  if (sentCtx) {
    charts.sentiment = new Chart(sentCtx, {
      type: 'doughnut',
      data: {
        labels: ['Positive', 'Neutral', 'Negative'],
        datasets: [{
          data: [62, 25, 13],
          backgroundColor: [
            CHART_DEFAULTS.color.success,
            CHART_DEFAULTS.color.warning,
            CHART_DEFAULTS.color.danger,
          ],
          borderColor: 'rgba(2, 6, 23, 0.9)',
          borderWidth: 3,
          hoverOffset: 8,
        }],
      },
      options: {
        ...getChartOptions('doughnut'),
        cutout: '68%',
        plugins: {
          ...getChartOptions('doughnut').plugins,
          legend: {
            position: 'bottom',
            labels: {
              color: 'rgba(248, 250, 252, 0.75)',
              font: { family: "'Inter', sans-serif", size: 11 },
              padding: 14,
              boxWidth: 10,
              boxHeight: 10,
            },
          },
        },
      },
    });
  }

  // 5. Competitor Radar/Bar
  const compCtx = qs('#competitorChart');
  if (compCtx) {
    charts.competitor = new Chart(compCtx, {
      type: 'bar',
      data: {
        labels: ['Apple', 'Microsoft', 'Google', 'Tesla', 'Amazon'],
        datasets: [
          {
            label: 'ROE %',
            data: [147.9, 34.5, 28.6, 8.2, 18.4],
            backgroundColor: CHART_DEFAULTS.color.primary,
            borderRadius: 5,
          },
          {
            label: 'Profit Margin %',
            data: [24.9, 36.1, 23.9, 8.1, 5.1],
            backgroundColor: CHART_DEFAULTS.color.accent,
            borderRadius: 5,
          },
        ],
      },
      options: {
        ...getChartOptions('bar'),
        plugins: {
          ...getChartOptions('bar').plugins,
        },
      },
    });
  }
}

/** Create a vertical linear gradient for Chart.js fill areas */
function createGradient(canvas, colorTop, colorBottom, horizontal = false) {
  try {
    const ctx = canvas.getContext('2d');
    const grad = horizontal
      ? ctx.createLinearGradient(0, 0, 0, canvas.parentElement?.clientHeight ?? 280)
      : ctx.createLinearGradient(0, 0, 0, canvas.parentElement?.clientHeight ?? 280);
    grad.addColorStop(0, colorTop);
    grad.addColorStop(1, colorBottom);
    return grad;
  } catch {
    return colorTop;
  }
}

function updateCharts(companyName, data) {
  // Stock chart
  if (charts.stock) {
    const prices = data.stockPrices[currentRange] ?? data.stockPrices['1M'];
    const labels = generateStockLabels(currentRange);
    charts.stock.data.labels = labels;
    charts.stock.data.datasets[0].data = prices;
    charts.stock.data.datasets[0].label = `${companyName} Price`;
    charts.stock.update('active');
  }

  // Revenue
  if (charts.revenue) {
    charts.revenue.data.datasets[0].data = data.revenues;
    charts.revenue.data.datasets[0].label = `${companyName} Revenue`;
    charts.revenue.update('active');
  }

  // Profit
  if (charts.profit) {
    charts.profit.data.datasets[0].data = data.profits;
    charts.profit.data.datasets[0].label = `${companyName} Net Profit`;
    charts.profit.update('active');
  }

  // Sentiment doughnut
  if (charts.sentiment) {
    const s = data.sentiment;
    charts.sentiment.data.datasets[0].data = [s.positive, s.neutral, s.negative];
    charts.sentiment.update('active');
  }
}

/* ================================================================= */
/* 12. CHART RANGE SELECTOR                                             */
/* ================================================================= */

function initChartRangeSelector() {
  const rangeGroup = qs('#chart-range');
  if (!rangeGroup) return;

  rangeGroup.addEventListener('click', e => {
    const btn = e.target.closest('.chart-range-btn');
    if (!btn) return;

    currentRange = btn.dataset.range;
    qsa('.chart-range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    if (currentCompany && charts.stock) {
      const data = COMPANY_DATA[currentCompany];
      const prices = data.stockPrices[currentRange] ?? data.stockPrices['1M'];
      charts.stock.data.labels = generateStockLabels(currentRange);
      charts.stock.data.datasets[0].data = prices;
      charts.stock.update('active');
    }
  });
}

/* ================================================================= */
/* 14. SENTIMENT PROGRESS BARS                                          */
/* ================================================================= */

function updateSentiment(data) {
  const s = data.sentiment;
  const tags = data.sentimentTags;

  updateSentimentCard('positive', s.positive, tags.positive);
  updateSentimentCard('neutral', s.neutral, tags.neutral);
  updateSentimentCard('negative', s.negative, tags.negative);
}

function updateSentimentCard(type, percent, tagList) {
  const valueEl = qs(`#sentiment-${type}-value`);
  const barEl = qs(`#sentiment-${type}-bar`);
  const card = qs(`.sentiment-card.${type}`);

  if (valueEl) {
    valueEl.dataset.count = percent;
    valueEl.dataset.animated = '';
    animateCounter(valueEl, 1200);
  }

  if (barEl) {
    barEl.dataset.percent = percent;
    animateProgressBar(barEl, 200);
  }

  if (card && tagList) {
    const tagsContainer = card.querySelector('.sentiment-tags');
    if (tagsContainer) {
      tagsContainer.innerHTML = tagList.map(t => `<span class="tag">${t}</span>`).join('');
    }
  }
}

/* ================================================================= */
/* 15. RISK METER                                                       */
/* ================================================================= */

function updateRiskMeter(data) {
  const circle = qs('#risk-progress-circle');
  const scoreText = qs('#risk-score-text');
  const reasonText = qs('#risk-reason-text');
  const recsList = qs('#risk-recommendations-list');
  const levels = qs('#risk-levels');

  const score = data.riskScore;
  const circumference = 439.8;
  const pct = score / 100;
  const offset = circumference - pct * circumference;

  if (circle) {
    circle.style.strokeDashoffset = circumference; // reset
    circle.className = 'risk-ring-progress'; // remove old level class
    setTimeout(() => {
      circle.style.strokeDashoffset = offset;
      circle.classList.add(data.riskLevel);
    }, 200);
  }

  if (scoreText) {
    scoreText.dataset.count = score;
    scoreText.dataset.animated = '';
    animateCounter(scoreText, 1400);
  }

  if (reasonText) reasonText.textContent = data.riskReason;

  if (recsList) {
    recsList.innerHTML = data.riskRecs
      .map(r => `<li><i class="fa-solid fa-check"></i> ${r}</li>`)
      .join('');
  }

  if (levels) {
    qsa('.risk-badge', levels).forEach(badge => {
      badge.classList.toggle('active', badge.dataset.level === data.riskLevel);
    });
  }
}

/* ================================================================= */
/* 16. AI RECOMMENDATION                                                */
/* ================================================================= */

function updateRecommendation(data) {
  const badge = qs('#rec-badge');
  const badgeText = qs('#rec-badge-text');
  const reasoning = qs('#rec-reasoning');
  const growthBar = qs('#rec-growth-bar');
  const growthVal = qs('#rec-growth-value');

  const recMap = { BUY: 'buy', HOLD: 'hold', SELL: 'sell' };
  const iconMap = {
    BUY: 'fa-circle-up',
    HOLD: 'fa-circle-pause',
    SELL: 'fa-circle-down',
  };

  if (badge) {
    badge.className = `rec-badge ${recMap[data.recommendation] ?? 'hold'}`;
    badge.querySelector('i').className = `fa-solid ${iconMap[data.recommendation] ?? 'fa-circle-pause'}`;
  }

  if (badgeText) badgeText.textContent = data.recommendation;
  if (reasoning) reasoning.textContent = data.reasoning;

  if (growthBar) {
    growthBar.dataset.percent = data.growthPotential;
    animateProgressBar(growthBar, 300);
  }

  if (growthVal) {
    growthVal.dataset.count = data.growthPotential;
    growthVal.dataset.animated = '';
    animateCounter(growthVal, 1200);
  }

  // SWOT
  updateSwot('strengths', data.strengths);
  updateSwot('weaknesses', data.weaknesses);
  updateSwot('opportunities', data.opportunities);
  updateSwot('threats', data.threats);
}

function updateSwot(type, items) {
  const card = qs(`.swot-card.${type} ul`);
  if (!card || !items) return;
  card.innerHTML = items.map(item => `<li>${item}</li>`).join('');
}

/* ================================================================= */
/* 17. PROGRESS BAR ANIMATOR (IntersectionObserver)                    */
/* ================================================================= */

function initProgressBarObserver() {
  const bars = qsa('.progress-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          animateProgressBar(entry.target, 100);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach(bar => observer.observe(bar));
}

/* ================================================================= */
/* 18. BACK TO TOP                                                      */
/* ================================================================= */

function toggleBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 500);
}

function initBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ================================================================= */
/* 19. CONTACT FORM VALIDATION                                          */
/* ================================================================= */

function initContactForm() {
  const form = qs('#contact-form');
  if (!form) return;

  const nameInput = qs('#contact-name');
  const emailInput = qs('#contact-email');
  const messageInput = qs('#contact-message');
  const submitBtn = qs('#contact-submit');
  const statusEl = qs('#form-status');

  // Animated label on focus
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('focus', () => {
      input.closest('.form-group')?.classList.remove('invalid');
      const err = qs(`#${input.id.replace('contact-', '')}-error`);
      if (err) err.textContent = '';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!validateForm(nameInput, emailInput, messageInput)) return;

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      form.reset();

      if (statusEl) {
        statusEl.textContent = '✓ Message sent! We will be in touch within 24 hours.';
        statusEl.className = 'form-status success';
        setTimeout(() => {
          if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'form-status';
          }
        }, 5000);
      }

      showToast('Message sent successfully!', 'success');
    }, 1600);
  });
}

function validateForm(nameInput, emailInput, messageInput) {
  let valid = true;

  const setError = (input, errId, msg) => {
    const group = input?.closest('.form-group');
    const err = qs(`#${errId}`);
    if (group) group.classList.toggle('invalid', !!msg);
    if (err) err.textContent = msg ?? '';
    if (msg) valid = false;
  };

  const name = nameInput?.value.trim() ?? '';
  setError(nameInput, 'name-error', name.length < 2 ? 'Please enter your name (min 2 characters).' : null);

  const email = emailInput?.value.trim() ?? '';
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setError(emailInput, 'email-error', !emailRx.test(email) ? 'Please enter a valid email address.' : null);

  const msg = messageInput?.value.trim() ?? '';
  setError(messageInput, 'message-error', msg.length < 10 ? 'Message must be at least 10 characters.' : null);

  return valid;
}

/* ================================================================= */
/* 21. PARALLAX MOUSE EFFECT (hero orbs)                               */
/* ================================================================= */

function initParallax() {
  const orbs = qsa('.glow-orb');
  if (!orbs.length) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const factor = (i + 1) * 12;
      orb.style.transform = `translate(${dx * factor}px, ${dy * factor}px)`;
    });
  }, { passive: true });
}

/* ================================================================= */
/* 23. FOOTER YEAR                                                      */
/* ================================================================= */

function initFooterYear() {
  const el = qs('#current-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ================================================================= */
/* 13. COMPETITOR TABLE HIGHLIGHTER                                     */
/* ================================================================= */

/**
 * The HTML already has .best applied statically.
 * This function re-applies best highlighting dynamically when data changes.
 * For the static table it's a no-op enhancement.
 */
function initCompetitorTable() {
  // The static HTML already marks .best cells; nothing extra needed unless
  // we dynamically re-render the table (future enhancement).
}

/* ================================================================= */
/* 2. DOM READY BOOTSTRAPPER                                            */
/* ================================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initLoadingScreen();
  initAOS();
  initNavbar();
  initTicker();
  initTypingEffect();
  initCounterObserver();
  initAnalysisEngine();
  initCharts();
  initChartRangeSelector();
  initProgressBarObserver();
  initBackToTop();
  initContactForm();
  initParallax();
  initCompetitorTable();
  initFooterYear();

  // Run initial analysis for Apple so the dashboard is populated on load
  setTimeout(() => {
    runAnalysis('Apple');
  }, 1600);

  // Smooth scroll for all internal anchor links
  document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = qs(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});