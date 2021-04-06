import * as React from 'react';
import { VPage, Page } from 'tonva';
import { COutBound } from "./COutBound";

export class VOutBoundOrderDetail extends VPage<COutBound> {

    async open(outBoundOrderId: number) {
        this.openPage(this.page, outBoundOrderId);
    }

    private page = (outBoundOrderInfo: any) => {
        console.log(outBoundOrderInfo);
        return <Page header="出库单信息" back="close">
            {outBoundOrderInfo}
        </Page>
    }
}