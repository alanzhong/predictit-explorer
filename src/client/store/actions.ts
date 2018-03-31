import { ControlsAction } from './controls';
import { MarketsAction } from './markets';
import { RouterActions } from './router';

export type Action = RouterActions | MarketsAction | ControlsAction;
