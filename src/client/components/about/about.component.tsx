import * as React from 'react';
import { Link } from 'redux-little-router';
import { MarketWithContracts } from '../../../types/client';
import { RouterPaths } from '../../store';
import { ActiveIcon, FavoriteIcon } from '../icon';
import { MarketListItem } from '../market-list-item';
import { aboutClass, appFooterClass, iconClass } from './about.styles';

export interface AboutProps {
  minDate: number;
  exampleMarket: MarketWithContracts | undefined;
}

export class About extends React.PureComponent<AboutProps> {
  public render() {
    const { minDate, exampleMarket } = this.props;
    return (
      <div className={aboutClass}>
        <h2>What is PredictIt?</h2>
        <p>
          <a href="https://www.predictit.org">PredictIt</a> is a "Prediction
          Market for Politics". "Markets" are created for events that may or may
          not occur. Market pariticipants (users of the site), can choose to buy
          shares ("Buy Yes") in an event happening. The current price of shares
          on a given market can then be seen as a market-based probability of an
          event occuring.
        </p>
        <h2>What is this?</h2>
        <p>
          This tool, <b>which is not associated in any way with PredictIt</b>,
          intends to visualize historical PredictIt data an easily searchable
          interface. Data is taken in 5 minute snapshots via the provided public
          API, going back to{' '}
          {minDate === Infinity
            ? '(loading...)'
            : new Date(minDate).toLocaleDateString()}{' '}
          (the date collection started).
        </p>
        <h2>How do the charts in this tool work?</h2>
        <p>
          Below, a Predictit prediction market is plotted, representing Paul
          Ryan's chances of being re-elected in 2018:
        </p>
        {exampleMarket ? (
          <MarketListItem market={exampleMarket} />
        ) : (
          <p>loading...</p>
        )}
        <p>
          The green areas, above the dashed line, represent times when the
          market is betting that the event will occur (i.e. Ryan will be
          re-elected). Conversely, the red areas represent times when the market
          is more negative on his chances (i.e. less than 50%).
        </p>
        <p>
          An <ActiveIcon className={iconClass} /> icon will appear on markets
          that are currently active, that means that the market is still open.
          You can click the <FavoriteIcon className={iconClass} /> to tag a
          market as a favorite. It will then show up the{' '}
          <Link href={RouterPaths.FAVORITES}>list of markets here.</Link>
        </p>
        <p>
          Probabilities are based on the "Last Trade" price provided by the
          public API. Try hovering over the chart to see market-based
          probabilities at specific points in time.
        </p>
        <div className={appFooterClass}>
          <a href="https://bsou.io">Ben Southgate</a> | 2018 |{' '}
          <a href="https://github.com/bsouthga/predictit-explorer">github</a>
        </div>
      </div>
    );
  }
}
