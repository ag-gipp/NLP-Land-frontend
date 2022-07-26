import Frame from './Frame';
import BarChart from './charts/BarChart';
import { GraphsProps } from '../types';
import BoxPlot from './charts/BoxPlot';
import { useFilter } from '../context/FilterContext';
import TreeMap from './charts/TreeMap';
import Grid from './charts/Grid';
import { mapMetric, metrics } from '../tools';
import { ROUTE_PAPERS } from '../consts';

export default function FrameWithGraphs(props: GraphsProps) {
  const filter = useFilter();
  let metric: string;

  // This distinction is necessary, so it won't show #Citations on the papers dashboard.
  // The endpoints for papers in the backend ignore the metric for queries, so it does not matter what is set.
  if (props.route === ROUTE_PAPERS.slice(1)) {
    metric = metrics[1].label;
  } else {
    metric = mapMetric(filter.filter.metric);
  }
  return (
    <Frame route={props.route}>
      <div className="frame-with-graphs">
        <BarChart yDimension={props.barChartYDimension} route={props.route} />
        <Grid columns={props.columns} route={props.route} />
        <BoxPlot xLabel={metric} route={props.route} />
        <TreeMap yDimension={metric} route={props.route} />
      </div>
    </Frame>
  );
}
