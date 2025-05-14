import React from "react";

function SideBarElement ({ name, icon, type, filter, isSelected = false, toggleLayer }) {
    const className = isSelected ? 'selected' : '';

    const handleClick = () => {
        if (type === 'filter' && toggleLayer) {
            toggleLayer(filter);
        }
    };

    return (
        <button className={`${type} ${className}`} onClick={handleClick}>
            {icon}
            <p>{name}</p>
        </button>
    );
}

export default SideBarElement;
