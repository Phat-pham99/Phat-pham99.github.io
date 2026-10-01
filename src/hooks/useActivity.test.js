import assert from 'node:assert/strict';
import test from 'node:test';
import { ACTIVITY_SAMPLES, COFFEE_HEARTBEAT, HEARTBEAT, advanceActivity, createActivity } from './useActivity.js';

test('starts with a full history where idle-green samples are a small minority', () => {
  const activity = createActivity();
  assert.equal(activity.samples.length, ACTIVITY_SAMPLES);
  assert.ok(activity.samples.filter((value) => value <= 10).length <= ACTIVITY_SAMPLES / 4);
  assert.ok(activity.samples.filter((value) => value > 10 && value < 78).length > ACTIVITY_SAMPLES / 2);
  assert.ok(activity.samples.filter((value) => value >= 78).length <= ACTIVITY_SAMPLES / 8);
  assert.ok(activity.samples.every((value) => value >= 0 && value <= 100));
});

test('scrolls existing history by one sample without rewriting or mutating it', () => {
  const activity = createActivity();
  const original = [...activity.samples];
  const next = advanceActivity(activity, false, 0.5);
  assert.equal(next.samples.length, ACTIVITY_SAMPLES);
  assert.deepEqual(next.samples.slice(0, -1), original.slice(1));
  assert.deepEqual(activity.samples, original);
  assert.equal(next.tick, activity.tick + 1);
});

test('coffee mode has a shorter cycle with more hot samples per beat', () => {
  assert.ok(COFFEE_HEARTBEAT.length < HEARTBEAT.length);
  assert.ok(
    COFFEE_HEARTBEAT.filter((value) => value >= 78).length / COFFEE_HEARTBEAT.length
      > HEARTBEAT.filter((value) => value >= 78).length / HEARTBEAT.length,
  );
  assert.equal(Math.max(...COFFEE_HEARTBEAT), 100);
  assert.equal(Math.max(...HEARTBEAT), 100);
});

test('each beat rises and recovers smoothly around a main and secondary peak', () => {
  let activity = createActivity();
  const cycle = [];
  for (let tick = 0; tick < HEARTBEAT.length; tick += 1) {
    activity = advanceActivity(activity, false, 0.5);
    cycle.push(activity.samples.at(-1));
  }
  assert.deepEqual(cycle, HEARTBEAT);
  assert.ok(cycle.slice(1).every((value, index) => Math.abs(value - cycle[index]) <= 30));
  assert.equal(cycle.filter((value) => value === 100).length, 1);
  assert.equal(cycle[16], 55);
  assert.ok(cycle[16] > cycle[13] && cycle[16] > cycle[19]);
  assert.equal(activity.phase, 0);
});

test('stays bounded and keeps fixed history length during sustained activity', () => {
  let activity = createActivity();
  for (let tick = 0; tick < 1000; tick += 1) {
    activity = advanceActivity(activity, tick % 2 === 0, tick % 3 === 0 ? 0 : 1);
    assert.equal(activity.samples.length, ACTIVITY_SAMPLES);
    assert.ok(activity.samples.every((value) => value >= 0 && value <= 100));
  }
});
