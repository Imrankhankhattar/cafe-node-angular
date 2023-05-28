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
    role: ''
}, {
    state: 'category',
    name: 'Manage Category',
    icon: 'category',
    role: 'admin'
}, {
    state: 'product',
    name: 'Manage Product',
    icon: 'inventory_2',
    role: 'admin'
}, {
    state: 'order',
    name: 'Manage Order',
    icon: 'list_alt',
    role: ''
},
{
    state: 'bill',
    name: 'Manage Bill',
    icon: 'import_contacts',
    role: ''
},
{
    state: 'user',
    name: 'Manage User',
    icon: 'people',
    role: ''
}
]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return menuItems;
    }
}