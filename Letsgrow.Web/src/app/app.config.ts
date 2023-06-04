import { Injectable, NgModule, APP_INITIALIZER } from '@angular/core';
import { environment } from '../../src/environment/environment';
import { HttpClientModule, HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AppConfig {
    static settings: any;
    static deviceSpecs: any;
    static ipInfo: any;
    static userTrackingInfo: any;
    static apiUrl ="https://localhost:7274/api/";
    constructor(){
    }

    async load(): Promise<void> {

    }

}
///we can further use enviroment variable not for now.
export function initializeApp(appConfig: AppConfig) {
    return () => appConfig.load();
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AppConfig,
     //   PushService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [AppConfig],
            multi: true
        }
    ]
})
export class AppConfigModule {

}
