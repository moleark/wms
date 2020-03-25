import { CUqBase } from '../CBase';
import { VInBound } from './VInBound';

export class CInBound extends CUqBase {

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VInBound);
    }

    tab = () => this.renderView(VInBound);
}