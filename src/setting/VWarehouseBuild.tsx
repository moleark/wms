
import * as React from 'react';
import { Page, View } from 'tonva';
import { CWarehouseBuild } from './CWarehouseBuild';
export class VWarehouseBuild extends View<CWarehouseBuild> {

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
            <div>库区管理界面！</div>
        </>
    };
}