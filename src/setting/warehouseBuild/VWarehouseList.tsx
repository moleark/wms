
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VWarehouseList extends VPage<CWarehouse> {

    async open() {
        this.openPage(this.page);
    }

    private renderWarehouse = (warehouse: any) => {

        // let { name, no: number } = warehouse;
        let { editWarehouse, searchWarehouseRoomByKey } = this.controller;
        let left = <div className="p-1 cursor-pointer text-info">
            <FA name="building-o" />
        </div>
        let right = <div className="p-1 cursor-pointer text-info" onClick={() => editWarehouse(warehouse)}>
            <FA name="edit" />
        </div>

        return <LMR left={left} right={right} className="px-2 py-2">
            <div className="px-1 py-1" onClick={() => searchWarehouseRoomByKey(warehouse)}>
                {tv(warehouse, v => <>{v.name}</>)}
            </div>
        </ LMR>
    }

    private page = observer(() => {

        let { warehouses, searchWarehouseByKey, newWarehouse } = this.controller;

        let header = <header>
            <div className="px-0"><span>库房管理</span></div>
        </header>;

        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchWarehouseByKey(key)}
                placeholder="请输入库房名称" />
        </div>;
        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => newWarehouse()} >添加新库房</button>;
        let warehouseList = <List items={warehouses} item={{ render: this.renderWarehouse }} none="无库房" />;

        return <Page header={header} right={right} footer={footer}>
            {warehouseList}
        </Page>;
    });
}