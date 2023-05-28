import { faSun,
         faMoon } from '@fortawesome/free-solid-svg-icons';

const darkTheme = (setIcon,setTheme,theme) => {
    setTheme(!theme)

    if(theme){
      document.body.classList.remove('light')
      document.body.classList.toggle('dark')

      setIcon(faSun);
    }else{
      document.body.classList.remove('dark')
      document.body.classList.toggle('light')

      setIcon(faMoon);
    }
}

export default darkTheme;