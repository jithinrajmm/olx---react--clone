import { createContext,useState } from "react";

export const Postss = createContext(null);


function Post({ children }) {
    const [singlePost, setSinglepost] = useState();
    return (
        <Postss.Provider value={{ singlePost, setSinglepost }}>
            {children}
        </Postss.Provider>
    )
    
}

export default Post;