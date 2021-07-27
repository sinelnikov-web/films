import React from "react";

interface HeaderProps {
    children: React.ReactNode
    title?: string
}

const Header: React.FC<HeaderProps> = ({children, title}) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-wrapper">
                    <span className="logo">{title ? title: 'Movies'}</span>
                    {children}
                </div>
            </div>
        </header>
    );
};

export default Header;