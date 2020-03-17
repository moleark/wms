
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, SearchBox, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VWarehouseBuildingList extends VPage<CWarehouse> {

    async open(warehouseBuilds?: any[]) {

        this.openPage(this.page);
    }

    private page = () => {

        let { warehouseBuilds, searchWarehouseBuildByKey, currentWarehouse } = this.controller;

        let header = <header>
            <div className="px-0">库区查询</div>
        </header>;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchWarehouseBuildByKey(currentWarehouse, key)}
                placeholder="请输入库区名称" />
        </div>;

        let footer = <button type="button" className="btn btn-primary w-100" >添加新库区</button>;
        let warehouseBuildList = <List items={warehouseBuilds} item={{ render: this.onWarehouseRender }} none="无库区" />;
        return <Page header={header} right={right} footer={footer}>
            {warehouseBuildList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { id, name, no: number } = warehouseBuild;
        let { searchWarehouseRoomByKey } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => searchWarehouseRoomByKey(id)}>
            <div>
                {number}: {name}
            </div>
        </ LMR>
    }

}