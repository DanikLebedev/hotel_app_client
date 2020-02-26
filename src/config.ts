
export const config = {
    baseUrl: 'http://localhost:5000/static/',
    crudUrl: 'http://localhost:3000',
    options: [
        { value: 'en', label: 'English' },
        { value: 'ru', label: 'Russian' },
    ],
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

export function filteredArrays(array: any[], inputName: string, search: string) {
    if (inputName === 'category-input') {
        return array.filter(item => {
            return item.category.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'user-email-input') {
        return array.filter(item => {
            return item.userEmail.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'status-input') {
        return array.filter(item => {
            return item.status.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'title-input') {
        return array.filter(item => {
            return item.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'descr-input') {
        return array.filter(item => {
            return item.description.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'price-input') {
        return array.filter(item => {
            return item.price.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'guests-input') {
        return array.filter(item => {
            return item.guests.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'area-input') {
        return array.filter(item => {
            return item.area.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else if (inputName === 'rooms-input') {
        return array.filter(item => {
            return item.rooms.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
    } else {
        return array
    }
}
