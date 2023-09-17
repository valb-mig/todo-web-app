const changeTheme = (userData ,setUserData) => {

  const element = document.body.classList;

  element.toggle('dark');
  element.toggle('light');

  setUserData({...userData, darkTheme:!userData.darkTheme});
}

export default changeTheme;