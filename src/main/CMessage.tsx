import { CUqBase } from '../CBase';
import { observable } from 'mobx';

export class CMessage extends CUqBase {

    count = observable.box<number>(0);

    /**
     * 打开初始页面
     * @param param 
     */
    protected async internalStart(param: any) {
        //this.pageMessage = null;
        await this.showMessage();
    }

    /**
     * 库房预警消息
     */
    showMessage = async () => {
        // this.openVPage(VMessage, this.pageMessage);
    }

}