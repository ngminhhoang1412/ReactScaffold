// assets
import { IconDeviceAnalytics } from '@tabler/icons';

// constant
const icons = { IconDeviceAnalytics };
// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const item1 = {
    id: 'index1',
    title: '',
    type: 'group',
    children: [
        {
            id: 'index11',
            title: 'Index1',
            type: 'item',
            url: '/index1',
            icon: icons.IconDeviceAnalytics,
            breadcrumbs: false
        }
    ]
};

export default item1;
