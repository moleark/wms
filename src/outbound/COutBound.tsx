import { CUqBase } from '../CBase';
import { VOutBound } from './VOutBound';
import { observable } from 'mobx';

export class COutBound extends CUqBase {

    count = observable.box<number>(0);

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VOutBound);
    }

    tab = () => this.renderView(VOutBound);
}