
import * as React from 'react';
import { Page, View } from 'tonva';
import { CWarehouseRoom } from './CWarehouseRoom';
export class VWarehouseRoom extends View<CWarehouseRoom> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        return <this.content />
    }

    private page = () => {
        return <Page header={false}>
            <this.content />
        </Page>;
    };

    private content = () => {
        return <>
            <div>房间管理界面！</div>
        </>
    };
}