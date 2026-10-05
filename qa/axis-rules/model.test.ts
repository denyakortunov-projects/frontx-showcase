import test from 'node:test';
import assert from 'node:assert/strict';
import { numericAxis, boundedPercentAxis, stackedExtents } from '../../src/chart-axis.ts';

test('reported maximum 220 uses 50, not 55; 260 grows outward', () => {
  assert.deepEqual(numericAxis([0, 220], { pixels: 192, integer: true }).ticks, [0,50,100,150,200,250]);
  assert.deepEqual(numericAxis([0, 260], { pixels: 192, integer: true }).ticks, [0,50,100,150,200,250,300]);
});
test('small counts, fractional rates and empty/zero cases remain distinct', () => {
  assert.deepEqual(numericAxis([0, 2], { integer: true }).ticks, [0,1,2]);
  assert.deepEqual(numericAxis([.001,.003,.007],{pixels:160}).ticks, [0,.002,.004,.006,.008]);
  for (const values of [[],[0],[NaN, Infinity]]) assert.deepEqual(numericAxis(values).domain, [0,1]);
  assert.ok(numericAxis([37]).domain[1] >= 37);
  const zoom = numericAxis([37], { includeZero: false });
  assert.ok(zoom.domain[0] < 37 && zoom.domain[1] > 37);
});
test('diverging stacks include both sides, not net totals', () => {
  const values = stackedExtents([[40,5,-30],[-20,-10,10],[NaN,Infinity]]);
  assert.deepEqual(values, [-30,45,-30,10,0,0]);
  const { domain } = numericAxis(values);
  assert.ok(domain[0] <= -30 && domain[1] >= 45);
  assert.deepEqual(numericAxis([-220,-165]).domain, [-250,0]);
});
test('resizing reduces density; fixed percentages preserve their domain', () => {
  assert.ok(numericAxis([220],{pixels:96}).ticks.length < numericAxis([220],{pixels:288}).ticks.length);
  assert.deepEqual(boundedPercentAxis(320,'horizontal').ticks,[0,25,50,75,100]);
  assert.deepEqual(boundedPercentAxis(160,'horizontal').ticks,[0,50,100]);
});
test('independent axes do not inherit each other’s range or count', () => {
  assert.deepEqual(numericAxis([12],{integer:true,pixels:160}).ticks,[0,5,10,15]);
  assert.deepEqual(numericAxis([850000],{pixels:160}).ticks,[0,200000,400000,600000,800000,1000000]);
});
test('readable unique labels, coverage and equal spacing across magnitudes', () => {
  for (const maximum of [.0000001,.03,.7,1,15,55,195,220,260,999,12500,850000,1e12]) {
    for (const pixels of [80,160,240,400]) {
      const axis=numericAxis([-maximum/3,maximum],{pixels});
      assert.ok(axis.domain[0] <= -maximum/3 && axis.domain[1] >= maximum);
      assert.equal(new Set(axis.ticks.map(axis.tickFormatter)).size,axis.ticks.length);
      assert.ok(axis.ticks.length <= 8);
      for(let i=1;i<axis.ticks.length;i++) assert.ok(Math.abs((axis.ticks[i]-axis.ticks[i-1])/axis.step-1)<1e-9);
      assert.ok(axis.ticks.map(axis.tickFormatter).every(label=>label !== '-0'));
    }
  }
});

test('unsupported machine ranges fail explicitly instead of looping', () => {
  assert.throws(() => numericAxis([-Number.MAX_VALUE,Number.MAX_VALUE]), RangeError);
  assert.throws(() => numericAxis([Number.MIN_VALUE]), RangeError);
  assert.throws(() => numericAxis([Number.MAX_VALUE]), RangeError);
});
