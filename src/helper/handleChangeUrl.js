const handleChangeUrl = (e = null,url,router) => {
    if(e){
        e.preventDefault();
    }
    router.push(url);
}

export default handleChangeUrl;