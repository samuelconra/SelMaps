import React from "react";
import { TiLocationArrowOutline } from "react-icons/ti";
import { RiPinDistanceLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CgTrees } from "react-icons/cg";
import { MdOutlineAttractions } from "react-icons/md";
import SideBarElement from "./SideBarElement";

const sidebarOptions = [
    {
        name: 'Neighbors',
        icon: <TiLocationArrowOutline />,
        type: 'option'
    },
    {
        name: 'Distances',
        icon: <RiPinDistanceLine />,
        type: 'option'
    },
    {
        name: 'Hotels',
        icon: <HiOutlineBuildingOffice />,
        type: 'filter'
    },
    {
        name: 'Parks',
        icon: <CgTrees />,
        type: 'filter'
    },
    {
        name: 'Attractions',
        icon: <MdOutlineAttractions />,
        type: 'filter'
    },
]

const mapSideBarElements = (type) => {
    return sidebarOptions
        .filter(e => e.type === type)
        .map(({name, icon, type}, index) => (
            <SideBarElement name={name} icon={icon} type={type} index={index}/>
        ));
};

function SideBar(){
    return (
        <section id="sidebar">
            <h1>Sel<span>Maps</span></h1>

            {/* OPTIONS */}
            {mapSideBarElements('option')}

            <div className="separator"></div>

            {/* FILTERS */}
            <h2>FILTERS</h2>
            {mapSideBarElements('filter')}
        </section>
    )
}

export default SideBar;