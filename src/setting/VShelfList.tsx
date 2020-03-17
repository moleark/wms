
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, SearchBox, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VShelfList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private page = () => {

        let { shelfs, searchShelfByKey, currentWarehouseRoom } = this.controller;

        let header = <header>
            <div className="px-0">货架查询</div>
        </header>;

        let right = <div className="d-flex align-items-center">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchShelfByKey(currentWarehouseRoom, key)}
                placeholder="请输入货架名称" />
        </div>;

        let footer = <button type="button" className="btn btn-primary w-100" >添加新货架组</button>;
        let shelfList = <List items={shelfs} item={{ render: this.onWarehouseRender }} none="无货架组" />;
        return <Page header={header} right={right} footer={footer}>
            {shelfList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { id, name, no: number } = warehouseBuild;
        let { searchShelfLayerByKey } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" onClick={() => searchShelfLayerByKey(id)}>
            <div>
                {number}: {name}
            </div>
        </ LMR>
    };

}