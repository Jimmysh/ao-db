import { Action } from '@ngrx/store';
import { fromJS } from 'immutable';

export function getActionHashCode(action: Action) {
  return fromJS(action).hashCode();
}
