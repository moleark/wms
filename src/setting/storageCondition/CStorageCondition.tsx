import * as React from 'react';
import { observer } from 'mobx-react';
import { CUqBase } from '../../CBase';
import { VStorageConditionList } from './VStorageConditionList';


export class CStorageCondition extends CUqBase {


    async internalStart() {

        this.openVPage(VStorageConditionList);
    }
}