# Amazing RP App 
### Приложение VK Mini Apps 

* [Доки VK Mini Apps](https://vk.com/dev/vk_apps_docs)
* [VK UI](https://vkcom.github.io/vkui-styleguide/)
* [VK Icons](https://vkcom.github.io/icons/)

### Роутер:
Действия которые роутер может выполнить:
- `setStory(story, initial_panel)` - Устанавливает активную Story у Epic'a, View и активную панель.
- `setPage(view, panel)` - Устанавливает активный View и Panel
- `goBack(from)` - Совершает действие назад, будь то закрытие модального окна, переход на прошлую панель, закрытие попапа и т.п;
- `openPopout(popout)` -  Открывает поппап.
- `closePopout()` - Закрывает поппап.
- `openModal(id)` - Открывает модальную страницу по её ID.
- `closeModal()` - Закрывает модальную страницу или открывает прошлую страницу.

### Сохранение позиции скролла:
Для сохранения позиции горизонтального скоролла нужно:

- Указать ID для элемента HorizontalScroll
```javascript
<HorizontalScroll id="EXAMPLE_TABS_LIST">
...
</HorizontalScroll>
```
- Сохранить позицию при демонтировании
```javascript
componentWillUnmount() {
    const {setScrollPositionByID} = this.props;

    setScrollPositionByID("EXAMPLE_TABS_LIST");
}
```
- Восстановить позицию при монтировании
```javascript
componentDidMount() {
    restoreScrollPosition();
}
```

### Важно
В файле index.js на 24 стороке указывается стартовая панель приложения:
```javascript
store.dispatch(setStory('home', 'base'));
```
В данном случае это значит, что приложение запустится с:

`activeStory: home`

`activeView: home`

`activePanel: base`

Как вы поняли значение ID у Root и стартового View должны совпадать.

В проекте есть 2 файла: "App" и "AppWithoutEpic", первый идет с навигационной панелью Epic, второй без, он подойдет для простых приложений.
```javascript
import App from './App';
```
По умолчанию для примера выбран вариант с Epic навигацией.

В файле по пути `/src/js/services/VK.js` нужно заменить значение константы `APP_ID` на ID вашего приложения

