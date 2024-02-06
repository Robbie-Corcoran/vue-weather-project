export function metricToImperial(temperature) {
  return (temperature * 9) / 5 + 32;
}

export function imperialToMetric(temperature) {
  return ((temperature - 32) * 5) / 9;
}
