import {Bar, BarChart, Cell, LabelList, XAxis, YAxis} from 'recharts';
import {ChartContainer} from '@gears-frontx/ui-kit/chart';
import {chartPalette} from './chart-palette';
import './comparison.css';

// Design-scenario inputs retained from the accepted comparison, not measured results.
const firstScreenHours = {scratch: 12, frontx: 7};
const deliverySpeed = firstScreenHours.scratch / firstScreenHours.frontx;
const correctionsPerChange = {scratch: 8, frontx: 4};
// Relative index: inverse correction count, not measured review duration.
const reviewEfficiency = correctionsPerChange.scratch / correctionsPerChange.frontx;
const examples = [
  {title: 'First-screen delivery speed', unit: '× baseline', own: 1, frontx: Number(deliverySpeed.toFixed(2)), max: 2, delta: `+${Math.round((deliverySpeed - 1) * 100)}%`, benefit: 'faster delivery', multiplier: true,
    explanation: '12 → 7 hours to the first screen. Start with Shell and screen templates instead of assembling the application structure.'},
  {title: 'Review efficiency', unit: '× baseline', own: 1, frontx: reviewEfficiency, max: 2.5, delta: `+${Math.round((reviewEfficiency - 1) * 100)}%`, benefit: 'review efficiency', multiplier: true,
    explanation: 'Half as many corrections per change: 8 → 4. UI Kit components and Design Guardrails give developers and AI agents shared conventions.'},
  {title: 'Regression checks passed', unit: '%', own: 82, frontx: 96, max: 100, delta: '+14 pp', benefit: 'more checks passed', multiplier: false,
    explanation: 'Use shared conventions as a basis for review. Your team still defines and runs the checks.'},
];
const config = {value: {label: 'Value', color: chartPalette.blue}};

export default function ComparisonMetrics() {
  return <div className="comparison-dashboard">
    <div className="comparison-metrics">
      {examples.map(m => <section className="comparison-metric" key={m.title} aria-label={m.title}>
        <div className="metric-title"><h3>{m.title}</h3><span>{m.unit}</span></div>
        <div className="metric-benefit"><strong>{m.delta}</strong><span>{m.benefit}</span></div>
        <ChartContainer config={config} className="metric-chart">
          <BarChart accessibilityLayer data={[{name: 'From scratch', value: m.own}, {name: 'With FrontX', value: m.frontx}]} layout="vertical" margin={{top: 4, bottom: 4, left: 0, right: 44}} barSize={18}>
            <XAxis type="number" domain={[0, m.max]} hide/>
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={92} tick={{fontSize: 11, fill: chartPalette.label}}/>
            <Bar dataKey="value" radius={[0, 5, 5, 0]} isAnimationActive={false}>
              <Cell fill={chartPalette.violet}/><Cell fill={chartPalette.blue}/>
              <LabelList dataKey="value" position="right" fill={chartPalette.ink} fontSize={12} formatter={value => m.multiplier ? `${value}×` : value}/>
            </Bar>
          </BarChart>
        </ChartContainer>
        <p className="metric-explanation">{m.explanation}</p>
      </section>)}
    </div>
  </div>;
}
