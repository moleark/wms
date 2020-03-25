
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VAddWarehouse extends VPage<CWarehouse> {

    async open() {
        this.openPage(this.page);
    }

    private page = () => {

        let { warehouses, searchWarehouseByKey, addWarehouse } = this.controller;

        let header = <header>
            <div className="px-0">库房查询</div>
        </header>;

        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchWarehouseByKey(key)}
                placeholder="请输入库房名称" />
        </div>;

        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => addWarehouse()} >添加新库房</button>;
        let warehousetList = <List items={warehouses} item={{ render: this.onWarehouseRender }} none="无库房" />;
        return <Page header={header} right={right} footer={footer}>
            {warehousetList}
        </Page>;
    };

    private onWarehouseRender = (warehouse: any) => {

        let { id, name, no: number } = warehouse;
        let { searchWarehouseBuildByKey } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info" >
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => searchWarehouseBuildByKey(id)}>
            <div>
                {number}: {name}
            </div>
        </ LMR>
    }

}