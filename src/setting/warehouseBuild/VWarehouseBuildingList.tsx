
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VWarehouseBuildingList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private renderWarehouseBuilding = (warehouseBuild: any) => {

        let { id, name, no: number } = warehouseBuild;
        let { searchWarehouseRoomByKey, editWarehouseBuilding } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="th-large" />
        </div>
        let right = <div className="p-2 cursor-pointer text-info" onClick={() => editWarehouseBuilding(warehouseBuild)}>
            <FA name="edit" />
        </div>

        return <LMR left={left} right={right} className="px-2 py-2">
            <div className="px-1 py-1" onClick={() => searchWarehouseRoomByKey(warehouseBuild)}>
                {name}
            </div>
        </ LMR>
        /*span style={{ color: 'lightgray', fontSize: 'smaller', paddingRight: '5px' }}>{number}</span>*/
    }

    private page = () => {

        let { currentWarehouse, warehouseBuilds, newWarehouseBuilding, searchWarehouseBuildByKey } = this.controller;
        let { name: warehouseName, no: warehouseNumber } = currentWarehouse;

        let header = <header>
            <div className="px-0"><span>{warehouseName}库区管理</span></div>
        </header>;
        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                onSearch={(key: string) => searchWarehouseBuildByKey(currentWarehouse, key)}
                placeholder="请输入库区名称" />
        </div>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newWarehouseBuilding()}>添加新库区</button>;
        let warehouseBuildList = <List items={warehouseBuilds} item={{ render: this.renderWarehouseBuilding }} none="无库区" />;

        return <Page header={header} right={right} footer={footer}>
            {warehouseBuildList}
        </Page>;
    };
}