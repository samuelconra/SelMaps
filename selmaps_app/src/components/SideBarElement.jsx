import React, { useState } from "react";

function SideBarElement ({name, icon, type}, index) {
    const isFilter = type == 'Filter';
    const [isSelected, setIsSelected] = useState(isFilter ? true : false);
    const className = isSelected ? 'selected' : '';

    return (
        <button className={`${type} ${className}`} key={index} onClick={() => setIsSelected(!isSelected)}>
            {icon}
            <p>{name}</p>
        </button>
    );
}

export default SideBarElement;