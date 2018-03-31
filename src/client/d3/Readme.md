## Custom D3 bundle

For some reason, rollup is having issues when directly importing the files in `./d3.ts` from `chart-svg.component.tsx`.

To get around this, we create a seperate ES2015 bundle for d3, and then inject that using `rollup-plugin-virtual`.
