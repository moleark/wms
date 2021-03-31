import * as React from 'react';
import { Page, VPage, FA, tv } from 'tonva';
import { observer } from 'mobx-react';
import { CSlectWarehouse } from './COutInBound';

export class VWarehouseListDataSouce extends VPage<CSlectWarehouse> {

    private warehouses: any;

    async open(warehouseList: any) {

        this.warehouses = await this.controller.loadWarehouseList();
        this.openPage(this.page);
    }

    private renderWarehouseList = (warehouse: any, onClick: any) => {

        return <div key={warehouse.id} className="col-12 col-md-4 cursor-pointer">
            {tv(warehouse, (value) => {
                let { id, name } = value;
                return <>
                    <div className="pt-1 pb-1 px-2" onClick={() => onClick(value)}
                        style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
                    >
                        <span className="ml-2 align-middle">
                            <FA name="building" className="text-info small" />
                            &nbsp; {name}
                        </span>
                    </div>
                </>;
            })}
        </div>
    }

    private page = observer((param: any) => {

        return <Page header="请选择要操作的库房">

            <div className="row no-gutters">
                {this.warehouses.map((v: any) => this.renderWarehouseList(v, this.onSelectClick))}
            </div>
        </Page>
    });

    private onSelectClick = async (warehouse: any) => {

        // console.log(warehouse);
        await this.controller.selectedWarehouse(warehouse);
    }
}