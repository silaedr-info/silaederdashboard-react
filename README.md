# Как запустить SilaederDashboard

## Доступные команды

В папке проекта вы можете запустить:

### `npm start`

Запускает приложение в режиме разработчика.\
Откройте [http://localhost:3000](http://localhost:3000) чтобы увидеть silaederdashboard в вашем браузере.

Это страница будет автоматически перезагружатся, когда вы вносите изменение в код silaederdashboard.\
Также вы увидите ошибки(если они есть) в консоли.

### `npm run build`

Собирает silaederdashboard в `build` папку.\
Эта команда автоматически оптимизирует React для деплоинга silaederdashboard.

## Для разработчиков:
### Установка линтера:
```
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
git add .husky/pre-commit
```
Теперь линтер будет проверять код перед каждым коммитом.