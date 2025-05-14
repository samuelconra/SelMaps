import React from "react";
import { TiLocationArrowOutline } from "react-icons/ti";
import { RiPinDistanceLine } from "react-icons/ri";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { CgTrees } from "react-icons/cg";
import { MdOutlineAttractions } from "react-icons/md";
import SideBarElement from "./SideBarElement";

const sidebarOptions = [
    { name: 'Neighbors', icon: <TiLocationArrowOutline />, type: 'option', functionality: 'neighbors'},
    { name: 'Distances', icon: <RiPinDistanceLine />, type: 'option', functionality: 'distances' },
    { name: 'Buffer', icon: <RiPinDistanceLine />, type: 'option', functionality: 'buffer' },
    { name: 'Clustering', icon: <RiPinDistanceLine />, type: 'option', functionality: 'clustering' },
    { name: 'Area', icon: <RiPinDistanceLine />, type: 'option', functionality: 'area' },
    { name: 'Hotels', icon: <HiOutlineBuildingOffice />, type: 'filter', functionality: 'hotels' },
    { name: 'Parks', icon: <CgTrees />, type: 'filter', functionality: 'parks' },
    { name: 'Attractions', icon: <MdOutlineAttractions />, type: 'filter', functionality: 'attractions' },
];

function SideBar({ activeLayers, toggleLayer, activeOptions, toggleOption }) {
    return (
        <section id="sidebar">
            <h1>Sel<span>Maps</span></h1>

            {/* OPTIONS */}
            {sidebarOptions.filter(e => e.type === 'option').map((e, index) => (
                <SideBarElement key={index} {...e} isSelected={activeOptions[e.functionality]} toggleOption={toggleOption}/>
            ))}

            <div className="separator"></div>

            {/* FILTERS */}
            <h2>FILTERS</h2>
            {sidebarOptions.filter(e => e.type === 'filter').map((e, index) => (
                <SideBarElement
                    key={index}
                    {...e}
                    isSelected={activeLayers[e.functionality]}
                    toggleLayer={toggleLayer}
                />
            ))}
        </section>
    );
}

export default SideBar;
