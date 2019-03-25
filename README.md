<h1 align="center">TripAdvisor's scraper</h1>

<!-- description -->
<p align="center">
This website allow you to see stats from TripAdvisor's Restaurant and Hotels pages from TripAdvisor.com 
</p>




### Dependencies

To run this application you need to have the following golang's package installed :

http-router
```
go get -u github.com/julienschmidt/httprouter...
```
colly
```
go get -u github.com/gocolly/colly/...
```

You also need to have yarn installed .

### Build the app

Go to back/src/server and launch the following command

```
go build
./server
```

Now open the front directory with your favorite IDE and install the dependencies listed inside the package.json file.

### IMPORTANT

Go to front/node_modules/@zeit/next-css/
Open css-loader-config.js with a text editor and comment the line 76 

minimize: !dev, become //minimize: !dev,

That's it you're ready to go !

Do thoses commands
```
yarn build
yarn run

```

Open [http://localhost:3000](http://localhost:3000) to view your running app !

