import React from "react";
import { Complete, NavbarLat, NavbarSup } from '../style/navbar.style.js';

function NavBar({children}){
    return(
        <Complete>
            <NavbarSup>
                <NavbarLat>
                    {children}
                </NavbarLat>
            </NavbarSup>
        </Complete>
    );
}

export default NavBar;