import React from "react";

function SideBarElement ({ name, icon, type, functionality, isSelected = false, toggleLayer, toggleOption }) {
    const className = isSelected ? 'selected' : '';

    const handleClick = () => {
        if (type === 'filter' && toggleLayer) {
            toggleLayer(functionality);
        } else {
            toggleOption(functionality)
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
