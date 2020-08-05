<template>
  <div id="app">
    <nav id="main-menu">
      <ul>
        <router-link tag="li" to="/donacje" ><img src="@/assets/images/blood-donation.png">Donacje </router-link>
        <router-link tag="li" to="/historia" id="before-main" ><img src="@/assets/images/greek-column.png">Historia</router-link>
        <router-link tag="li" to="/" id="main-link"><img src="@/assets/images/house-outline.png"><p>Start</p></router-link>
        <router-link tag="li" to="/informacje" id="after-main"><img src="@/assets/images/information.png">Informacje </router-link>
        <router-link tag="li" to="/galeria"><img src="@/assets/images/gallery.png">Galeria </router-link>
      </ul>
    </nav>
    <!-- <div id="banner">
			<img src="http://klubhdkferstena.pl/wp-content/uploads/2018/04/logo-ksk.png">
			<h3>Stowarzyszenie Honorowych Dawców Krwi Rzeczpospolitej Polskiej,<br> 
				Klub Honorowych Dawców Krwi im. dr. praw Andrzeja Ferstena<br> 
				 przy Centrali PKP S.A. w Warszawie</h3>
		</div> -->
    <div id="banner2">
			<img src="http://klubhdkferstena.pl/wp-content/uploads/2018/04/logo-ksk.png">
			<h3>SHDKRP, KHDW im. dr. praw Andrzeja Ferstena<br> 
		  </h3> 
		</div>
    <transition name="slide-fade" mode="out-in" appear>
      <router-view />
    </transition>
      <!-- <div id="content">
       <div id="side-menu">
            <ul>
                <li  v-for="link in component" @click="currentComponent = link" :key="link" :class="{ activeLink: link == currentComponent}">
                    {{ link }}
                </li>
                
            </ul>
            <div class="slide-menu" @click="slideMenu = !slideMenu"><font-awesome-icon :icon="['fas', 'bars']" />  <font-awesome-icon :icon="['fas', 'caret-right']" /> </div>
            
        </div>
      </div> -->
    <footer id="footer">
      <div id="shdk">
      <a href="http://shdkrp.pl/"><img src="@/assets/images/SHDK.png"></a></div>
      
      <div id="realizacja">
        Projekt i realizacja: Szymon Holewiński
      </div>
    </footer>
  </div>
</template>

<script>



export default {
  name: 'App',
  data(){
    return{
      
      
    }
  }
}
</script>

<style>
</style>
<style lang="scss">
@import 'src/assets/sass/style.scss';
</style>

