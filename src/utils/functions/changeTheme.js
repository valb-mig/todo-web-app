import { useGlobalContext } from '@/config/context/store';

const changeTheme = () => {

  const { userData ,setUserData } = useGlobalContext();

  const element = document.body.classList;

  console.log("Change theme: "+ element);

  let currentThemeDark = userData.darkTheme;

  if(currentThemeDark){
    element.remove('dark')
    element.toggle('light')
    setUserData({...userData, darkTheme:false})
  }else{
    element.remove('light')
    element.toggle('dark')
    setUserData({...userData, darkTheme:true})
  }
}

export default changeTheme;