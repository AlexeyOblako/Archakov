import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className='pizza-block'
        speed={2}
        width={282}
        height={445}
        viewBox="0 0 282 445"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="296" rx="10" ry="10" width="280" height="23" />
        <rect x="0" y="345" rx="10" ry="10" width="297" height="88" />
        <rect x="0" y="455" rx="10" ry="10" width="70" height="30" />
        <rect x="125" y="446" rx="24" ry="24" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton