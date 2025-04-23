import React from 'react'

const Layout = ({children} :Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className="overflow-hidden">
            {children}
        </div>
    )
}
export default Layout
