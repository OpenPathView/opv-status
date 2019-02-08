import Vue from 'vue'
import Router from 'vue-router'
import CampaignList from '@/components/CampaignList'
import Campaign from '@/components/campaign/Campaign'
import PanoViewer from '@/components/PanoViewer'
import ImportCampaign from '@/components/ImportCampaign'
import Spark from '@/components/Spark'
import Celery from '@/components/Celery'
import PanoramaSelector from '@/components/panoramaSelector/PanoramaSelector'
import PathDetailsViewer from '@/components/pathDetails/PathDetailsViewer'
import PathDetailsEditor from '@/components/pathDetails/PathDetailsEditor'
import VirtualTourViewer from '@/components/virtualTour/VirtualTourViewer'
import VirtualTourEditor from '@/components/virtualTour/VirtualTourEditor'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CampaignList',
      component: CampaignList
    },
    {
      path: '/campaign/:id_campaign/:id_malette',
      props: true,
      name: 'Campaign',
      component: Campaign
    },
    {
      path: '/viewer/:id_tile/:id_malette',
      props: true,
      name: 'Viewer',
      component: PanoViewer
    },
    {
      path: '/import/',
      props: false,
      name: 'ImportCampaign',
      component: ImportCampaign
    },
    {
      path: '/spark/:id_campaign/:id_malette',
      props: true,
      name: 'SparkValue',
      component: Spark
    },
    {
      path: '/spark/',
      props: false,
      name: 'Spark',
      component: Spark
    },
    {
      path: '/celery/:id_campaign/:id_malette',
      props: true,
      name: 'CeleryValue',
      component: Celery
    },
    {
      path: '/celery/',
      props: false,
      name: 'Celery',
      component: Celery
    },
    {
      path: '/panoramaSelector/:id_campaign/:id_malette',
      props: true,
      name: 'PanoramaSelector',
      component: PanoramaSelector
    },
    {
      path: '/pathDetailsViewer/:id_campaign/:id_malette',
      props: true,
      name: 'PathDetailsViewer',
      component: PathDetailsViewer
    },
    {
      path: '/pathDetailsEditor/:id_path_details/:id_malette',
      props: true,
      name: 'PathDetailsEditor',
      component: PathDetailsEditor
    },
    {
      path: '/virtualTourViewer',
      props: true,
      name: 'VirtualTourViewer',
      component: VirtualTourViewer
    },
    {
      path: '/virtualTourEditor/:id_virtualtour/:id_malette',
      props: true,
      name: 'VirtualTourEditor',
      component: VirtualTourEditor
    }
  ]
})
