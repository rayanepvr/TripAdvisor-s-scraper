package main

import (
    "fmt"
    "github.com/julienschmidt/httprouter"
    "github.com/gocolly/colly"
    "net/http"
    "log"
    "time"
    "regexp"
    "encoding/json"
    "strings"
    	"os"


)

type Data struct {
	Average string
    Rating string
    One string
    Two string
    Three string
    Four string
    Five string
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
    fmt.Fprint(w, "Welcome!\n")
}


func Hello(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {

    enableCors(&w);
     data := Data{}
    /* Check if the link could be parsed */
    jobDone := false;
    /* When I need to do OnHtml only one time */
    flag := true;

    c := colly.NewCollector()
    /* For the restaurant */
    c.OnHTML(`div[class=restaurants-detail-overview-cards-RatingsOverviewCard__primaryRatingRow--VhEsu]`, func(e *colly.HTMLElement) {
		jobDone = true;
        log.Println("Course found", e.Request.URL)
		data.Average = e.ChildText("span")
        ratingCountmp := e.ChildText("a")
        data.Rating = strings.Fields(ratingCountmp)[0]



     })
     c.OnHTML(`div[class="choices"]`, func(e *colly.HTMLElement) {
         		if(flag){
                     log.Println("Course found", e.Request.URL)

                     reg, err := regexp.Compile("[a-zA-Z]+")
                     if err != nil {
                         log.Fatal(err)
                     }

                     categoryValueAndName := e.ChildText("div")
                     onlyCategoryValue := reg.ReplaceAllString(categoryValueAndName, " ")
                     onlyCategoryValueArray:= strings.Fields(onlyCategoryValue);

                     if(len(onlyCategoryValueArray) == 5){
                         flag = false;

                         data.Five = onlyCategoryValueArray[0];
                         data.Four = onlyCategoryValueArray[1];
                         data.Three = onlyCategoryValueArray[2];
                         data.Two = onlyCategoryValueArray[3];
                         data.One = onlyCategoryValueArray[4];

                         return;

                     }
                 }


           })
     /* For the hotel */
     c.OnHTML(`div[class=hotels-hotel-review-about-with-photos-Reviews__rating--2X_zZ]`, func(e *colly.HTMLElement) {
     		jobDone = true;

     		log.Println("Course found", e.Request.URL)

            e.ForEach("span", func(_ int, elem *colly.HTMLElement) {
                if strings.Contains(elem.Text, "reviews") {
                            data.Rating = strings.Fields(elem.Text)[0]
                 }else{
                    /* Check if the Text isn't null to prevent wrong write */
                    if(elem.Text != ""){
                        data.Average = elem.Text

                    }
                 }

            })







     })
     c.OnHTML(`div[class="ui_column is-5 is-12-mobile"]`, func(e *colly.HTMLElement) {
         		if(flag){
                     log.Println("Course found two", e.Request.URL)

                     reg, err := regexp.Compile("[a-zA-Z]+")
                     if err != nil {
                         log.Fatal(err)
                     }
                     var tab[]string;

                      e.ForEach("span", func(_ int, elem *colly.HTMLElement) {
                          tab= append(tab,elem.Text);


                      })
                     allRates := strings.Join(tab," ")

                     log.Println("salut", tab)

                     onlyCategoryValue := reg.ReplaceAllString(allRates, " ")
                     onlyCategoryValueArray:= strings.Fields(onlyCategoryValue);

                     if(len(onlyCategoryValueArray) == 5){
                         flag = false;

                         data.Five = onlyCategoryValueArray[0];
                         data.Four = onlyCategoryValueArray[1];
                         data.Three = onlyCategoryValueArray[2];
                         data.Two = onlyCategoryValueArray[3];
                         data.One = onlyCategoryValueArray[4];

                         return;

                     }
                 }


           })

     c.OnRequest(func(r *colly.Request) {
     		fmt.Println("Visiting", r.URL.String())
     })
     /* Avoid overflow */
     c.Limit(&colly.LimitRule{
     		Parallelism: 2,
     		RandomDelay: 5 * time.Second,
     })
     c.OnError(func(_ *colly.Response, err error) {
         log.Println("Something went wrong:", err)
     })
     c.Visit("https://www.tripadvisor.com/" + ps.ByName("name"))



     if(!jobDone){
        data.Average = "-1";
     }


    d, err := json.Marshal(data)
    if err != nil {
    	fmt.Println("error:", err)
    }
    os.Stdout.Write(d)

    fmt.Fprintf(w, "%s", string(d))


}

func main() {
    router := httprouter.New()
    router.GET("/", Index)
    router.GET("/https:\\//www.tripadvisor.com/:name", Hello)

    log.Fatal(http.ListenAndServe(":8083", router))
}