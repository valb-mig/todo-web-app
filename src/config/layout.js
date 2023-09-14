export default function Layout({ Font, Context, children }){
    
    return(
        <div className={Font.className}>
            <Context>
                { children }
            </Context>
        </div>
    );
}