import * as React from 'react';
import { VPage, Page } from 'tonva';
import { COutBound } from "./COutBound";

export class VCutOffSuccess extends VPage<COutBound> {

    async open(outBoundResult: any) {
        this.openPage(this.page, outBoundResult);
    }

    private page = (outBoundResult: any) => {
        return <Page header="截单成功" back="close">
            <div className="p-3 bg-white mb-3">
                <div className="mb-3">截单成功！</div>
                <p className="">
                    出库单号: <span className="h5 text-info">{outBoundResult.no}</span><br /><br />
                    点击此处可跳转到出库单详情界面打印单据。
                </p>
            </div>
        </Page>
    }
}