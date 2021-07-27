import React from "react";

interface MainContainerProps {
    children: React.ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({children}) => {
    return (
        <main className="main">
            <div className="container">
                {children}
            </div>
        </main>
    );
};

export default MainContainer;