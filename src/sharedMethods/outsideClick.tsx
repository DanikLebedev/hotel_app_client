import React from 'react';

export const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>, id: string, props: any) => {
    event.stopPropagation();
    const target = event.target as HTMLDivElement;
    if (target.id === id) {
        props.closeModal();
    }
    return;
};
