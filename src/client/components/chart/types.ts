export interface Scale<Range, Output, Input> {
  (v: Input): Output;
  ticks(n: number): Input[];
  tickFormat(): (v: Input) => string;
  range(): Range[];
}
