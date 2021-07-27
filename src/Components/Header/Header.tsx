import React from "react";

interface HeaderProps {
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({children}) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <span className="logo">Movies</span>
                    {children}
                </div>
            </div>
        </header>
    );
};

export default Header;