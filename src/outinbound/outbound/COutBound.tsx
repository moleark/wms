import { CUqBase } from '../../CBase';
import { VReadyOutBoundCut, VOutBound } from './index';

export class COutBound extends CUqBase {

    async internalStart(param: any) {

        this.openVPage(VReadyOutBoundCut);
    }


}