import * as React from 'react';
import { Page, VPage, FA, View, Prop, IconText, PropGrid } from 'tonva';
import { COutInBound } from './COutInBound';
import { observer } from 'mobx-react';

export class VOutInBound extends View<COutInBound> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {

        let { searchWarehouseList, searchReadyOutBoundCutTastList, warehouse } = this.controller;

        let header = <header>
            <div className="px-2"><span>库存管理</span></div>
        </header>;

        let right = warehouse !== undefined ?
            <div className="d-flex justify-content-between">
                <span className="px-2 py-1" style={{ fontSize: 'smaller', color: 'yellow' }} onClick={() => searchWarehouseList()}>
                    {warehouse.name} <FA name="search" />
                </span>
            </div> :
            <div className="d-flex justify-content-between">
                <span className="px-2 py-1 red" style={{ fontSize: 'smaller', color: 'red' }} onClick={() => searchWarehouseList()}>
                    请选择库房 <FA name="search" />
                </span>
            </div>;

        let rows: Prop[];
        rows = [
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="info-circle" text="库存查询" />,
                onClick: null
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="info-circle" text="发货查询" />,
                onClick: null
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="sign-out" text="出库任务处理" />,
                onClick: searchReadyOutBoundCutTastList
            },
            '',
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="sign-in" text="入库任务处理" />,
                onClick: null
            }
        ]

        return <Page header={header} right={right}>
            <PropGrid rows={rows} values={{}} />
        </Page >;
    });
}