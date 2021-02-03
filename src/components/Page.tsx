import React, { ReactElement } from "react";

interface PageProps {
    children: ReactElement
    title: string
}

export default function Page(props: PageProps){
    const {children, title} = props
    return <div className={`page ${title}`}>
        {children}
    </div>
}