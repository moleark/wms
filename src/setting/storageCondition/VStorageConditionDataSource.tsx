import * as React from 'react';
import { Page, VPage, FA, tv } from 'tonva';
import { CStorageCondition } from './index';
import { observer } from 'mobx-react';

export class VStorageConditionDataSource extends VPage<CStorageCondition> {

    private warehouseStorageCondition: any;

    async open(warehouseStorageCondition: any) {

        let storageConditions = await this.controller.loadStorageCondition();
        this.warehouseStorageCondition = warehouseStorageCondition;
        this.openPage(this.page, { storageConditions: storageConditions });
    }

    private renderStorageCondition = (storageCondition: any, onClick: any) => {

        return <div key={storageCondition.id} className="col-12 col-md-4 cursor-pointer">
            {tv(storageCondition, (value) => {
                let { id, name } = value;
                return <>
                    <div className="pt-1 pb-1 px-2" onClick={() => onClick(id)}
                        style={{ border: '1px solid #eeeeee', marginRight: '-1px', marginBottom: '-1px' }}
                    >
                        <span className="ml-2 align-middle">
                            <FA name="thermometer-half" className="text-info small" />
                            &nbsp; {name}
                        </span>
                    </div>
                </>;
            })}
        </div>
    }

    private page = observer((param: any) => {

        return <Page header="选择对应的系统存储条件">

            <div className="row no-gutters">
                {param.storageConditions.map((v: any) => this.renderStorageCondition(v, this.onSelectClick))}
            </div>
        </Page>
    });

    private onSelectClick = async (storageCondition: any) => {

        await this.controller.addStorageConditionMap(this.warehouseStorageCondition, storageCondition);
    }

}