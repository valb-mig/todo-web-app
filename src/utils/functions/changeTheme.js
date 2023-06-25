const changeTheme = (setTheme,theme) => {

  const element = document.body.classList;

  console.log("Change theme: "+ element);

  if(theme){
    element.remove('dark')
    element.toggle('light')
    setTheme(!theme)
  }else{
    element.remove('light')
    element.toggle('dark')
    setTheme(!theme)
  }
}

export default changeTheme;