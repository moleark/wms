import * as React from 'react';
import './App.css';
import { NavView, nav, start } from 'tonva';
import { CApp } from './CApp';
import { appConfig } from './configuration';


nav.setSettings(appConfig);

class App extends React.Component {

  private onLogined = async () => {
    //console.log("onlogined");
    await start(CApp, appConfig);
  }

  public render() {
    //console.log("app render");
    return <NavView onLogined={this.onLogined} notLogined={this.onLogined} />
  }
}

export default App;
