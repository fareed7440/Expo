import I18n from 'ex-react-native-i18n'

I18n.fallbacks=true;
I18n.translations={
  'en':require("../values/stringsEN.json"),
  'es':require("../values/stringsES.json")
}

export default I18n;
