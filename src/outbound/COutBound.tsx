import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VOutBound } from './VOutBound';
import { observable } from 'mobx';

class OutBoundInfo extends PageItems<any> {

    private sectionTuid: Tuid;

    constructor(sectionTuid: Tuid) {
        super();
        this.firstSize = this.pageSize = 13;
        this.sectionTuid = sectionTuid;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.sectionTuid.search("", pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        if (item === undefined) return 0;
        return item.id;
    }
}

export class COutBound extends CUqBase {

    @observable OutBoundInfo: OutBoundInfo;
    count = observable.box<number>(0);

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VOutBound);
    }

    tab = () => this.renderView(VOutBound);
}