# Скрипт бриджит Arbitrum Goerli Eth в Xai

Для запуска скрипта нужен Node.js, если ещё не установлен, устанавливаем с
https://nodejs.org/en

НЕ УСТАНАВЛИВАЙТЕ версию Current, ставьте версию LTS!

Запускаем терминал, переходим в терминале в папку xai-bridge

Выполняем команды:

```
npm install
```

ждём когда установятся все зависимости если появились ошибки, пробуем команду

```
npm install --legacy-peer-deps
```

Далее необходимо добавить приватные ключи в файл keys.txt каждый ключ на новой
строке

## Принцип работы

1. Скрипт смотрит есть ли баланс в сети Arbitrum Goerli, если есть и он больше
   MAX_BRIDGE_IN_ETH, продолжает работать
2. Смотрит есть ли баланс в сети Xai, если уже есть, не делает бридж, если
   баланс 0, то бриджит eth из Arbitrum Goerli

## Настройки в файле constants.ts:

`export const MIN_BRIDGE_IN_ETH = 0.1` - сколько минимально бриджить
`export const MAX_BRIDGE_IN_ETH = 0.15` - сколько максимально бриджить

Выбирается случайное число между MIN_BRIDGE_IN_ETH и MAX_BRIDGE_IN_ETH

`export const DELAY_FROM_SEC = 100` - минимальное время ожидания в секундах
между кошельками

`export const DELAY_TO_SEC = 200` - максимальное время ожидания в секундах между
кошельками

Запуск

```
npm start
```

## Поблагодарить автора можно отправив донат в любой evm сети на:

```
raznorabochiy.eth
raznorabochiy.arb
raznorabochiy.bnb
0xE8eAbec7CE9e8Bf78A766E8556E542BC2C9446ae
```
