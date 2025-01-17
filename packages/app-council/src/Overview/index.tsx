// Copyright 2017-2019 @polkadot/app-democracy authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { DerivedElectionsInfo } from '@polkadot/api-derive/types';
import { ComponentProps as Props } from './types';

import BN from 'bn.js';
import React from 'react';
import { createType } from '@polkadot/types';
import { withCalls } from '@polkadot/ui-api';
import { Button } from '@polkadot/ui-app';

import Members from './Members';
import SubmitCandidacy from './SubmitCandidacy';
import Summary from './Summary';
import Vote from './Vote';

const NULL_INFO: DerivedElectionsInfo = {
  members: {},
  candidates: [],
  candidateCount: new BN(0),
  desiredSeats: new BN(0),
  nextVoterSet: createType('SetIndex'),
  termDuration: createType('BlockNumber'),
  voteCount: createType('VoteIndex'),
  voterCount: createType('SetIndex')
};

class Overview extends React.PureComponent<Props> {
  public render (): React.ReactNode {
    const { electionsInfo = NULL_INFO } = this.props;

    return (
      <>
        <Summary electionsInfo={electionsInfo} />
        <Button.Group>
          <SubmitCandidacy electionsInfo={electionsInfo} />
          <Button.Or />
          <Vote electionsInfo={electionsInfo} />
        </Button.Group>
        <Members electionsInfo={electionsInfo} />
      </>
    );
  }
}

export default withCalls<Props>(
  [
    'derive.elections.info',
    {
      propName: 'electionsInfo'
    }
  ]
)(Overview);
