<template>
    <div class="calendar">
        
        <div class="cal-head">
            
                <div class="next-prev prev"  @click="changeMonth(-1)">
                    
                    <transition name="slide-fade" mode="out-in">
                        <div :key="prevMonth">
                            <font-awesome-icon :icon="['fas', 'caret-left']" /> 
                            {{ months[prevMonth] }}
                        </div>
                    </transition>
                </div>
            
            <div class="currentDate">

                <transition name="slide-fade" mode="out-in">
                    <div class="year" :key="activeYear">{{  activeYear }}</div>
                </transition>
                <transition name="slide-fade" mode="out-in">
                    <div class="month" :key="monthName" >{{ monthName }}</div>
                </transition>

            </div>
            <div class="next-prev next" @click="changeMonth(+1)">
        
                <transition name="slide-fade" mode="out-in">
                    <div :key="nextMonth">
                        {{ months[nextMonth] }}
                    </div>
                </transition>
                <font-awesome-icon :icon="['fas', 'caret-right']" />
                
            </div>
        </div>
        <div class="day-names">
            <span class="day-name" 
                v-for="day in days" 
                :key="day">
                    {{ day }}
            </span>
        </div>
        <transition name="rotate" mode="out-in">
        <div  class="cal-days" :key="activeMonth+'month'">
            <div class="day prev" 
            v-for="p in weekDay-1" 
            :key="months[prevMonth]+'-'+p">
                
                <template v-if=" windowWidth > 991 ">
                     {{months[prevMonth] }}
                 </template>
                 <template v-else>
                     {{ months[prevMonth].substring(0,3) }}
                 </template>
            </div>
            
             <div class="day" v-for="i in dayArray" 
             :class="{ 
                 'current-day' : i[1] == currentDay && activeMonth == currentMonth && activeYear == currentYear, 
                 'pass' : i[1] < currentDay && activeMonth == currentMonth && activeYear == currentYear 
                 || activeMonth < currentMonth && activeYear == currentYear 
                 || activeYear < currentYear 
                 }" 
                 :key="'day-'+i[1]" >

               
                <div class="day-number has-event" 
                :class="events[i[2]].typ.key" 
                v-if="i[0] == 'e'"  
                :key="'event-'+i[1]" >
                    <div @click="eventShow = true, activeEvent = events[i[2]], firstRender = true" class="number">
                        {{ i[1] }}
                    </div>
                    
                    
                </div>
                 
                
                <div class="day-number" v-else :key="'day-'+i[1]">
                    <div class="number"> {{ i[1] }} </div>
                    
                </div>


            </div>
            
            

             <div class="day next" v-for="n in 7 - nextNumber" :key="months[nextMonth]+'-'+n" >
                 <template v-if=" windowWidth > 991 ">
                     {{months[nextMonth] }}
                 </template>
                 <template v-else>
                     {{ months[nextMonth].substring(0,3) }}
                 </template>
                
            </div>
        </div>
        
        </transition>
        <transition name="slide-fade"  >
            <template v-if="firstRender">
                <div class="event" 
                    v-show="eventShow"
                    :key="'event-box'"
                    :class="activeEvent.typ.key">
                    <div class="shade"  @click="eventShow = false">
                        <font-awesome-icon :icon="['fas', 'times']" />                         
                    </div>
                    <div class="box">
                        
                        <h2>{{ activeEvent.typ.name}}</h2>
                        
                        <div class="inside-box">
                            <table>
                                <tbody>
                                    <tr class="date">
                                        <td><font-awesome-icon :icon="['fas', 'calendar-alt']" /></td>
                                        <td>{{activeEvent.year}}.{{activeEvent.month}}.{{activeEvent.day}}</td>
                                    </tr>
                                    <tr class="addres">
                                        <td><font-awesome-icon :icon="['fas', 'map-marked-alt']" /></td>
                                        <td>{{ activeEvent.lokal.adres }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p class="desc">{{activeEvent.typ.opis}}<br>{{activeEvent.opis}}</p>
                        </div>
                        <p class="map" v-html="activeEvent.lokal.frame"></p>
                    </div>
                </div>
            </template>
                
            </transition>
    </div>

</template>



<script>


export default {
    name: 'Calendar',
    props:['legend'],
    data(){
        return {
            date: new Date(),
            months: ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'],
            days: ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'So', 'Nd'],
            activeYear:null,
            activeMonth:null,
            eventsArray:[],
            dayArray:[],
            firstRender:false,
            eventShow:false,
            windowWidth: document.documentElement.clientWidth,
            activeEvent:{},
            miejsca:{   
                nowogrodzka:{
                    key:'nowogrodzka',
                    frame:`<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19547.385123507647!2d21.019955101727277!3d52.235697491688356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3aa5f09c7ea86748!2sRegionalne+Centrum+Krwiodawstwa+i+Krwiolecznictwa.+Oddzia%C5%82+Terenowy+Nr+12+w+Warszawie!5e0!3m2!1spl!2spl!4v1541841025610" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>`,
                    adres:'Nowogrodzka 59, 05-077 Warszawa'
                },
                siedziba:{
                    key:'siedziba',
                    frame:`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.7345971739373!2d20.96355361579608!3d52.21187037975696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecca8bb10318b%3A0x63e0dd4387d9c5e6!2sSzcz%C4%99%C5%9Bliwicka+62%2C+05-077+Warszawa!5e0!3m2!1spl!2spl!4v1548835557660" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>`,
                    adres:'Szczęśliwicka 62, Warszawa, Polska'
                },
                centralny:{
                    key:'centralny',
                    frame:`<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.80597314102!2d21.000774415632343!3d52.22874281552566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8d7049c6ff%3A0xb87d838e2f351b40!2sDworzec+Centralny%2C+Warszawa!5e0!3m2!1spl!2spl!4v1548835625650" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>`,
                    adres:'al. Jerozolimskie 54, 00-001 Warszawa'
                },
                utk:{
                    key:'UTK',
                    frame:`<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9776.914304168931!2d20.9727229!3d52.2210649!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x23fd2555a03d003!2sUrz%C4%85d+Transportu+Kolejowego!5e0!3m2!1spl!2spl!4v1548835895212" width="800" height="600" frameborder="0" style="border:0" allowfullscreen></iframe>`,
                    adres:'al. Jerozolimskie 134, 02-305 Warszawa'
                }
            },
            typy:{
                donacja:{
                    key:'donacja',
                    name:'Oddawanie krwi',
                    opis:'Klubowa akcja oddawnia krwi',
                    
                },
                impreza:{
                    key:'impreza',
                    name:'Impreza',
                    opis:'Impreza klubowa dla członków i Ich rodzin'
                },
                spotkanie:{
                    key:'spotkanie',
                    name:'Zebranie',
                    opis:'Zebranie Klubowe'
                }
            },
            events:[]
            
        }
    },
    computed:{
        // activeEvent(){
        //     switch(this.eventsArray.length){
        //         case 0:
        //             return null;
        //             break;
        //         default:
        //             return this.eventsArray[0];
        //             console.log(this.eventsArray[0])
                    
        //             console.log(this.eventsArray[0])
        //             break;
        //     }
        // },
        actualEvents(){
            const year = this.activeYear.toString()
            return this.events
        },
        windowWidth(){
                return window.innerWidth;
            },
        currentDay(){
            return this.date.getDate();
        },
        weekDay(){
            
            var d = new Date(this.activeYear, this.activeMonth).getDay();
            if(d == 0){
                return 7;
            }
            else{
                return d;
            }
        },
        nextNumber(){
            return (this.weekDay-1 + this.numberOfDays) % 7 ;
        },
        prevNumber(){
            return new Date(this.activeYear, this.prevMonth, 0).getDate();
        },
        currentYear(){
            return this.date.getFullYear();
        },
        currentMonth(){
            return this.date.getMonth();
        },
        prevMonth(){
           
            switch(this.activeMonth == 0){
                case true:
                    return 11;
                    break;
                default:
                    return this.activeMonth-1;
            }
        },
        nextMonth(){
            
            switch(this.activeMonth ){
                case 11:
                    return 0;
                    break;
                default:
                    return this.activeMonth+1;
            }
        },
        monthName(){
            return this.months[this.activeMonth];
        },
        numberOfDays(){
            return new Date(this.activeYear, this.activeMonth+1 ,0).getDate();
        }
        
    },
    methods:{
        createEventsArrary(){
            this.eventsArray = []
            for(var e = 0; e < this.events.length ; e++){
                switch(this.events[e].year){
                    case this.activeYear:
                        switch (this.events[e].month){
                            case this.activeMonth:
                                this.eventsArray.push(e);
                                break;
                            default:
                                break;
                        }
                    default:
                        break;
                }
            }
            this.eventsArray.reverse();
            
            console.log('eventsArray:'+this.eventsArray)
        
        },
        changeMonth(a){
            if (this.activeMonth==11 && a==+1){
                this.activeMonth = 0;
                this.activeYear++;
            } 
            else if(this.activeMonth==0 && a==-1){
                this.activeMonth = 11;
                 this.activeYear--;
            }
            else{
                this.activeMonth += a
            }
            this.createEventsArrary();
            this.asd();
          
        
        },
        asd(){
            this.dayArray = []
            
            for(var z = 1 ; z <= this.numberOfDays ; z++){
                switch(this.eventsArray.length){
                    case 0:
                        this.dayArray.push(['d',z]);
                        break;
                    default:
                        switch(this.events[this.eventsArray[0]].day){
                            case z:
                            console.log('1:'+this.eventsArray)
                                this.dayArray.push(['e',z,this.eventsArray[0]]); 
                                console.log('2:'+this.eventsArray)
                                this.eventsArray.shift();
                                console.log('3:'+this.eventsArray)
                                break;
                            default:
                                this.dayArray.push(['d',z]);
                                break;
                        }
                }   
            }
            console.log('dayArray:'+this.dayArray)
        
       
        },
        resize (event){
            this.windowWidth = document.documentElement.clientWidth;
        }

    },
    ready(){
        window.addEventListener('resize', this.resize)
    },
    created(){
        this.activeYear=this.currentYear;
        this.activeMonth=this.currentMonth;
        this.createEventsArrary();
        this.asd();
        fetch('http://vtest.klubhdkferstena.pl/assets/jsons/cal-events.json')
            .then(resp => resp.json())
            .then(resp => {
                this.events = resp;
            })
        
        
    }
}
</script>

