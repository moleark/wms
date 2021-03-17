import * as React from 'react';
import { Page, View } from 'tonva';
import { COutBound } from './COutBound';
export class VOutBound extends View<COutBound> {

    async open(param?: any) {
        this.openPage(this.page);
    }

    render(param: any): JSX.Element {
        //return <this.content />
        return <this.content />;

    }

    private page = () => {
        return <Page header={false}>
            <this.content />
        </Page >;
    };

    private content = () => {
        return <>
            <div>
                ---
            </div>
        </>
    };
}