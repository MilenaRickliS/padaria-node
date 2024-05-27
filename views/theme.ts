// theme.js
abstract class Theme {
    abstract getTheme();
    abstract setTheme(newTheme);
    abstract toggleTheme();
  }
  
  class LightTheme extends Theme {
    getTheme() {
      return 'light';
    }
  
    setTheme(newTheme) {
      if (newTheme === 'dark') {
        return new DarkTheme();
      } else {
        return this;
      }
    }
  
    toggleTheme() {
      return new DarkTheme();
    }
  }
  
  class DarkTheme extends Theme {
    getTheme() {
      return 'dark';
    }
  
    setTheme(newTheme) {
      if (newTheme === 'light') {
        return new LightTheme();
      } else {
        return this;
      }
    }
  
    toggleTheme() {
      return new LightTheme();
    }
  }
  
  module.exports = { LightTheme, DarkTheme };