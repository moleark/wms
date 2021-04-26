import * as React from 'react';
import { Page, FA, View, Prop, IconText, PropGrid } from 'tonva';
import { COutInBound } from './COutInBound';
import { observer } from 'mobx-react';
import { dropRight, flowRight } from 'lodash';

export class VOutInBound extends View<COutInBound> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.page />
    }

    private page = observer(() => {

        let { searchWarehouseList, searchReadyOutBoundCutTastList, openOutBoundOrderHistory, warehouse } = this.controller;

        let header = <header>
            <div className="px-2"><span>库存管理</span></div>
        </header>;

        let right = warehouse !== undefined ?
            <div className="d-flex justify-content-between mr-1 my-2" onClick={() => searchWarehouseList()}>
                <span className="text-info"><FA className="mr-1" name="search" />{warehouse.name}</span>
            </div> :
            <div className="d-flex justify-content-between mr-1 my-2" onClick={() => searchWarehouseList()}>
                <span className="cursor-pointer text-info"><FA className="mr-1" name="search" />请选择库房</span>
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
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="info-circle" text="出库单历史" />,
                onClick: openOutBoundOrderHistory
            },
            {
                type: 'component',
                component: <IconText iconClass="text-info mr-2" icon="info-circle" text="入库单历史" />,
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
            <PropGrid className="px-2" rows={rows} values={{}} />
        </Page >;
    });
}