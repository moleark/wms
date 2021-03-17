import * as React from 'react';
import { Page, VPage, FA, List, LMR, SearchBox, tv } from 'tonva';
import { COutBound } from './COutBound';
import { observer } from 'mobx-react';

export class VReadyOutBoundCut extends VPage<COutBound> {

    readyOutBoundList: any[];

    async open(readyOutBoundList: any[]) {

        this.readyOutBoundList = readyOutBoundList;
        this.openPage(this.page);
    }

    private renderReadyOutBoundCut(readyOutBoundList: any) {

        return <LMR className="px-2 py-2">
            <div className="px-1 py-1" onClick={() => null}>
                {tv(readyOutBoundList, t => <>{t.consigneeAddress}</>)}
            </div>
        </ LMR>
    };

    private page = () => {

        let header = <header>
            <div className="px-0"><span>待出库任务列表</span></div>
        </header>;

        let footer = <button type="button" className="btn btn-primary w-100" onClick={() => null} >截单</button>;
        let tastList = <List items={this.readyOutBoundList} item={{ render: this.renderReadyOutBoundCut }} none="无待截单数据" />;

        return <Page header={header} footer={footer}>
            {tastList}
        </Page>
    };

}