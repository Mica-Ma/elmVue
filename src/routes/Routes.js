import home from '../pages/home.vue'
import news from '../pages/news.vue'
import New from '../pages/new.vue'
import video from '../pages/video.vue'
import videos from '../pages/videos.vue'


const routes = [
	{path:'/', name:'home', component: home},
	{path:'/news',name:'news', component: news},
		// children:[
		// 	{path:'/', name:'news', component: news},
		// 	{path:'/:id', name:'news', component: news},



		// ]},
	{path:'/videos',name:'videos', component: videos},
	{path:'/video/:id',name:'video', component: video},

	{path:'/news/:id',name:'new', component: New}

]




export {routes}