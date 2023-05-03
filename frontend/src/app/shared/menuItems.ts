import { Injectable } from "@angular/core";

export interface Menu {
    state: string,
    name: string,
    icon: string,
    role: string,
}
const menuItems = [{
    state: 'dashboard',
    name: 'Dashboard',
    icon: 'av_timer',
    role: 'user'
}, {
    state: 'dashboard',
    name: 'Dashboard',
    icon: 'av_timer',
    role: 'user'
}]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return menuItems;
    }
}