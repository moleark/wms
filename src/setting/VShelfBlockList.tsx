
import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox } from 'tonva';
import { CWarehouse } from './CWarehouse';

export class VShelfBlockList extends VPage<CWarehouse> {

    async open() {

        this.openPage(this.page);
    }

    private page = () => {

        let { shelfBlocks, searchShelfBlockByKey, currentShelfLayer } = this.controller;

        let header = <header>
            <div className="px-0">货位查询</div>
        </header>;

        let right = <div className="d-flex align-items-center mr-2">
            <SearchBox
                size='sm'
                onSearch={(key: string) => searchShelfBlockByKey(currentShelfLayer, key)}
                placeholder="请输入货位名称" />
        </div>;

        let footer = <button type="button" className="btn btn-primary w-100" >添加新货位</button>;
        let shelfBlockList = <List items={shelfBlocks} item={{ render: this.onWarehouseRender }} none="无货位" />;
        return <Page header={header} right={right} footer={footer}>
            {shelfBlockList}
        </Page>;
    };

    private onWarehouseRender = (warehouseBuild: any) => {

        let { name, no: number } = warehouseBuild; //id
        //let {  } = this.controller;
        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2" >
            <div>
                {number}: {name}
            </div>
        </ LMR>
    };

}