import { Tuid } from 'tonva';
import { PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VInBound } from './VInBound';

class HomeSections extends PageItems<any> {

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

export class CInBound extends CUqBase {

    //    cApp: CApp;
    async internalStart(param: any) {

        this.openVPage(VInBound);
    }

    tab = () => this.renderView(VInBound);
}