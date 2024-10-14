import * as S from "./style";

import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import SchoolFullLogo from "@media/SchoolFullLogo.png"

const NotLoginSide = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleOverlayClick = () => {
        setIsOpen(false);
    };

    return (
        <>
            <IoMenu onClick={toggleSidebar} style={{ cursor: "pointer", fontSize: "30px" }} />
            {isOpen && <S.Overlay onClick={handleOverlayClick} />}
            <S.SidebarCont className={isOpen ? "active" : ""}>
                <S.SidebarWrap>
                    <img src={SchoolFullLogo} alt="school_logo" className="school_logo" />
                    <h3>로그인이 필요합니다.</h3>
                </S.SidebarWrap>
            </S.SidebarCont>
        </>
    );
};

export default NotLoginSide;
