import { Tuid, Query, PageItems, Map } from 'tonva';
import { observable } from 'mobx';
import { CUqBase } from '../CBase';
import { VWarehouseList } from './VWarehouseList';

class PageWarehouse extends PageItems<any> {

    private searchWarehouse: Query;
    constructor(searchQuery: Query) {
        super();
        this.firstSize = this.pageSize = 14;
        this.searchWarehouse = searchQuery;
    }

    protected async load(param: any, pageStart: any, pageSize: number): Promise<any[]> {
        if (pageStart === undefined) pageStart = 0;
        let ret = await this.searchWarehouse.page(param, pageStart, pageSize);
        return ret;
    }
    protected setPageStart(item: any): any {
        this.pageStart = item === undefined ? 0 : item.id;
    }
}

export class CWarehouse extends CUqBase {

    @observable warehouse: PageWarehouse;
    @observable warehouseList: any[] = [];          /*库房列表 */
    //    cApp: CApp;
    async internalStart(param: any) {

        //this.searchInquiryByKey(param);
        let warehouse = await this.uqs.warehouse.GetWarehouseList.page(undefined, 0, 14);
        this.openVPage(VWarehouseList);
    }

    searchInquiryByKey = async (key: string) => {
        this.warehouse = new PageWarehouse(this.uqs.warehouse.GetWarehouseList);
        this.warehouse.first({ key: key });
    }

    async getWarehouse(): Promise<any[]> {

        return await this.uqs.warehouse.GetWarehouseList.page(undefined, 0, 14);
    }
}