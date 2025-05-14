import React from "react";
import { TiLocationArrowOutline } from "react-icons/ti";
import { RiPinDistanceLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CgTrees } from "react-icons/cg";
import { MdOutlineAttractions } from "react-icons/md";
import SideBarElement from "./SideBarElement";

const sidebarOptions = [
    { name: 'Neighbors', icon: <TiLocationArrowOutline />, type: 'option' },
    { name: 'Distances', icon: <RiPinDistanceLine />, type: 'option' },
    { name: 'Hotels', icon: <HiOutlineBuildingOffice />, type: 'filter', filter: 'hotels' },
    { name: 'Parks', icon: <CgTrees />, type: 'filter', filter: 'parks' },
    { name: 'Attractions', icon: <MdOutlineAttractions />, type: 'filter', filter: 'attractions' },
];

function SideBar({ activeLayers, toggleLayer }) {
    return (
        <section id="sidebar">
            <h1>Sel<span>Maps</span></h1>

            {/* OPTIONS */}
            {sidebarOptions.filter(e => e.type === 'option').map((e, index) => (
                <SideBarElement key={index} {...e} />
            ))}

            <div className="separator"></div>

            {/* FILTERS */}
            <h2>FILTERS</h2>
            {sidebarOptions.filter(e => e.type === 'filter').map((e, index) => (
                <SideBarElement
                    key={index}
                    {...e}
                    isSelected={activeLayers[e.filter]}
                    toggleLayer={toggleLayer}
                />
            ))}
        </section>
    );
}

export default SideBar;
