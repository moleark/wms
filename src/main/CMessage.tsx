import { Query, PageItems } from 'tonva';
import { CUqBase } from '../CBase';
import { VMessage } from './VMessage';
import { observable } from 'mobx';

class PageMessage extends PageItems<any> {

    private searchQuery: Query;

    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 10;
        this.searchQuery = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchQuery.page(param, pageStart, pageSize);
        return ret;
    }

    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}
export class CMessage extends CUqBase {
    @observable pageMessage: PageMessage;
    count = observable.box<number>(0);

    //初始化
    protected async internalStart(param: any) {
        //this.pageMessage = null;
        await this.showMessage();
    }

    //库房预警消息
    showMessage = async () => {
        this.openVPage(VMessage, this.pageMessage);
    }

}