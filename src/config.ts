export const config = {
    baseUrl: 'http://localhost:5000/static/',
    crudUrl: 'http://localhost:3000',
    options: [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
    ],
    APP_COMET_CHAT_ID: '1485958f328b7c5',
    APP_COMET_AGENT_UID: 'support',
};

export function sortNumbersTypes(field: string): any {
    return {
        up: {
            class: 'sort-up',
            fn: (a: any, b: any) => {
                if (typeof a[field] && b[field] !== 'number') {
                    a = new Date(a[field]).getTime();
                    b = new Date(b[field]).getTime();
                    return a - b;
                } else {
                    return a[field] - b[field];
                }
            },
        },
        down: {
            class: 'sort-down',
            fn: (a: any, b: any) => {
                if (typeof a[field] && b[field] !== 'number') {
                    a = new Date(a[field]).getTime();
                    b = new Date(b[field]).getTime();
                    return b - a;
                } else {
                    return b[field] - a[field];
                }
            },
        },
        default: {
            class: 'sort',
            fn: (a: any, b: any) => a,
        },
    };
}

