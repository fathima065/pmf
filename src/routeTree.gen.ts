/* eslint-disable */
// @ts-nocheck
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as AboutRouteImport } from './routes/about'
import { Route as ContactRouteImport } from './routes/contact'
import { Route as DashboardRouteImport } from './routes/dashboard'
import { Route as ServicesRouteImport } from './routes/services'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const AboutRoute=AboutRouteImport.update({id:'/about',path:'/about',getParentRoute:()=>rootRouteImport} as any)
const ContactRoute=ContactRouteImport.update({id:'/contact',path:'/contact',getParentRoute:()=>rootRouteImport} as any)
const DashboardRoute=DashboardRouteImport.update({id:'/dashboard',path:'/dashboard',getParentRoute:()=>rootRouteImport} as any)
const ServicesRoute=ServicesRouteImport.update({id:'/services',path:'/services',getParentRoute:()=>rootRouteImport} as any)
export const routeTree=rootRouteImport._addFileChildren({IndexRoute,AboutRoute,ContactRoute,DashboardRoute,ServicesRoute})._addFileTypes<any>()
