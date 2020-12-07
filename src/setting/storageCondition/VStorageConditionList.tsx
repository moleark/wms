import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox, tv } from 'tonva';
import { CStorageCondition } from './CStorageCondition';
import { observer } from 'mobx-react';


export class VStorageConditionList extends VPage<CStorageCondition> {

    async open() {

        this.openPage(this.page);
    }

    private page = observer(() => {

        let header = <header>
            <div className="px-0"><span>存储条件管理</span></div>
        </header>;

        let footer = <button type="button" className="btn btn-primary w-100" >添加存储条件</button>;
        // let warehousetList = <List items={warehouses} item={{ render: this.renderWarehouse }} none="无库房" />;

        return <Page header={header} footer={footer}>
            <div>123</div>
        </Page>;
    });
}