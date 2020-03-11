
import * as React from 'react';
import { Page, VPage, FA, List, View, IconText, LMR, tv } from 'tonva';
import { CWarehouse } from './CWarehouse';
import { observer } from 'mobx-react';

export class VWarehouseList extends VPage<CWarehouse> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    private page = () => {
        let right =
            <div>
                <span className="fa-stack">
                    <IconText iconClass="fa fa-cog" icon="gear" text="" />
                </span>
            </div>;
        let footer = <button type="button" className="btn btn-primary w-100" >添加新库房</button>;
        return <Page header="库房列表" right={right} footer={footer}>
            <this.content />
        </Page>;
    };

    private onWarehouseRender = (warehouse: any) => {

        let right = <div className="p-2 cursor-pointer text-info">
            <FA name="edit" />
        </div>
        return <LMR right={right} className="px-3 py-2">
            <div>
                {tv(warehouse)}
            </div>
        </LMR>
    }

    private content = observer(() => {

        let { warehouse } = this.controller;
        let warehousetList = <List items={warehouse} item={{ render: this.onWarehouseRender }} none="无库房" />;
        return <>
            {warehousetList}
        </>
    });

}