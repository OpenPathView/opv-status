import axios from 'axios'
import Config from '@/config.json'

const opv = Config.server.host
const opvApi = opv + ':' + Config.server.api_port + '/'
const opvDb = opv + ':' + Config.server.dm_port + '/v1/files/'
const opvSt = opv + ':' + Config.server.status_port + '/'
const opvGraph = opv + ':' + Config.server.graph_port + '/'

export default class ApiManager {
  static dirHttpPath (dmUuid) {
    return opvDb + dmUuid;
  }
  static getCampaignList () {
    return axios.get(opvApi + 'campaign')
  }
  static getCampaign (idCampaign, idMalette) {
    return axios.get(opvApi + 'campaign/' + idCampaign + '/' + idMalette)
  }
  static getCampaignLotsWithSensors (idCampaign) {
    return axios.get(opvApi + 'lot/with_sensors?id_campaign=' + idCampaign)
  }
  static getCp (idCp, idMalette) {
    return axios.get(opvApi + 'cp/' + idCp + '/' + idMalette)
  }
  static getPanorama (idPanorama, idMalette) {
    return axios.get(opvApi + 'panorama/' + idPanorama + '/' + idMalette)
  }
  static putPanorama (panorama) {
    return axios.put(opvApi + 'panorama/' + panorama.id_panorama + '/' + panorama.id_malette, panorama)
  }
  static putLot (lot) {
    return axios.put(opvApi + 'lot/' + lot.id_lot + '/' + lot.id_malette, lot)
  }
  static getLotPicturesPath (path) {
    return axios.get(opvDb + path)
  }
  static getTile (idTile, idMalette) {
    return axios.get(opvApi + 'tile/' + idTile + '/' + idMalette)
  }
  static getImportStatus () {
    return axios.get(opvSt + 'import/status')
  }
  static postImportLaunch (args) {
    return axios.post(opvSt + 'import/launch', args)
  }
  static postImportLog (args) {
    return axios.post(opvSt + 'import/log', args)
  }
  static postSparkLaunch (args) {
    return axios.post(opvSt + 'spark/launch', args)
  }
  static postCeleryLaunch (args) {
    return axios.post(opvSt + 'celery/launch', args)
  }
  static getSparkPort () {
    return axios.get(opvSt + 'spark/port')
  }
  static getSparkApp (port) {
    return axios.get(opv + ':' + port + '/api/v1/applications')
  }
  static getSparkJob (port, app) {
    return axios.get(opv + ':' + port + '/api/v1/applications/' + app + '/jobs')
  }
  static putSensors (sensors) {
    return axios.put(opvApi + 'sensors/' + sensors.id_sensors + '/' + sensors.id_malette, sensors)
  }
  static getPathDetailFromCampaign (idCampaign) {
    return axios.get(opvApi + 'path_details?id_campaign=' + idCampaign)
  }
  static getPathDetails (idPathDetails, idMalette) {
    return axios.get(opvApi + 'path_details/' + idPathDetails + '/' + idMalette)
  }
  static getPathNodeFromPathDetails (idPathDetails) {
    return axios.get(opvApi + 'path_node?id_path_details=' + idPathDetails)
  }
  static getPathEdgeFromPathDetails (idPathDetails) {
    return axios.get(opvApi + 'path_edge?id_path_details=' + idPathDetails)
  }
  static getPathNodeExtendedFromPathDetails (idPathDetails) {
    return axios.get(opvApi + 'path_node_extended?id_path_details=' + idPathDetails)
  }
  static postPathDetails (pathDetails) {
    return axios.post(opvApi + 'path_details', pathDetails)
  }
  static getPanoramaSensorsFromCampaign (idCampaign) {
    return axios.get(opvApi + 'panorama_sensors?id_campaign=' + idCampaign)
  }
  static getPanoramaSensors (idPanorama, idMalette) {
    return axios.get(opvApi + 'panorama_sensors/' + idPanorama + '/' + idMalette)
  }
  static getActivePanoramaSensorsFromCampaign (idCampaign) {
    return axios.get(opvApi + 'panorama_sensors?id_campaign=' + idCampaign + '&active=true')
  }
  static deletePathNode (idPathNode, idMalette) {
    return axios.delete(opvApi + 'path_node/' + idPathNode + '/' + idMalette)
  }
  static deletePathNodeFromPathDetails (idPathDetails) {
    return axios.delete(opvApi + 'path_node?id_path_details=' + idPathDetails)
  }
  static deletePathEdgeFromPathDetails (idPathDetails) {
    return axios.delete(opvApi + 'path_edge?id_path_details=' + idPathDetails)
  }
  static postPathNode (pathNode) {
    return axios.post(opvApi + 'path_node/', pathNode)
  }
  static postPathEdge (pathEdge) {
    return axios.post(opvApi + 'path_edge/', pathEdge)
  }
  static postGraphAll (perimeter, radialSpace, reduce, minPath, pathDetails) {
    return axios.post(opvGraph + 'all/' + perimeter + '/' + radialSpace + '/' + reduce + '/' + minPath, pathDetails)
  }
  static postVirtualTour (virtualTour) {
    return axios.post(opvApi + 'virtualtour', virtualTour)
  }
  static postVirtualTourPath (virtualTourPath) {
    return axios.post(opvApi + 'virtualtour_path', virtualTourPath)
  }
  static getVirtualTourPathFromVirtualTour (idVirtualTour) {
    return axios.get(opvApi + 'virtualtour_path?id_virtualtour=' + idVirtualTour)
  }
  static getAllVirtualTour () {
    return axios.get(opvApi + 'virtualtour')
  }
  static getVirtualTour (idVirtualTour, idMalette) {
    return axios.get(opvApi + 'virtualtour/' + idVirtualTour + '/' + idMalette)
  }
  static deleteVirtualTourPath (idVirtualTourPath, idMalette) {
    return axios.delete(opvApi + 'virtualtour_path/' + idVirtualTourPath + '/' + idMalette)
  }
}
