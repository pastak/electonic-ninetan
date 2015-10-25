# electonic-ninetan

:sunny: :cloud: :umbrella: Forecast Info from [Ninetan's forecasting system (ないんたん)](http://sx9.jp/) on menubar.

## ScreenShot

[![https://gyazo.com/0af6b7f49e04d2f8926a96e1f90eee12](https://i.gyazo.com/0af6b7f49e04d2f8926a96e1f90eee12.png)](https://gyazo.com/0af6b7f49e04d2f8926a96e1f90eee12)

[![https://gyazo.com/1160e1a74ea3c4376b9b150a3aa59aa9](https://i.gyazo.com/1160e1a74ea3c4376b9b150a3aa59aa9.png)](https://gyazo.com/1160e1a74ea3c4376b9b150a3aa59aa9)

## Download

https://github.com/pastak/electonic-ninetan/releases

## How To Use

At first, select `settings` menu and set areas you want to fetch forecasting.

It will auto-update every minutes.

Default icon is sunny. When it will rain within 15 minutes, icon changes to umbrella.

Click area name then open ninetan webpage of that area  on browser.

## Development

- `$ git clone git@github.com:pastak/electonic-ninetan.git`
- `cd electonic-ninetan`
- `npm install`
  - It requires `electron-compilers` and `electron-prebuilt`
- Run development mode `$ npm run run`
- Build packages `$npm run build`
