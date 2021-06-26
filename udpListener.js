const PORT = 49003
const HOST = '127.0.0.1'

const dgram = require('dgram');
const server = dgram.createSocket('udp4')


const typeElementIDMap = {
  'sim/cockpit/electrical/beacon_lights_on': 'beacon',
  'sim/cockpit/radios/transponder_code': 'transpondercode',
  'sim/cockpit2/gauges/indicators/airspeed_kts_pilot': 'airspeed',
  'sim/cockpit2/gauges/indicators/altitude_ft_pilot': 'altitude',
  'sim/cockpit2/gauges/indicators/heading_vacuum_deg_mag_pilot': 'heading',
  'sim/flightmodel/position/groundspeed': 'groundspeed',
  'sim/flightmodel/position/latitude': 'latitude',
  'sim/flightmodel/position/longitude': 'longitude',
  'sim/flightmodel/position/vh_ind_fpm': 'vertairspeed',
  'sim/flightmodel/weight/m_fixed': 'payloadweight',
  'sim/flightmodel/weight/m_fuel_total': 'fuelweight',
  'sim/flightmodel/weight/m_total': 'totalweight',
  'sim/flightmodel2/gear/on_ground[0]': 'gear0onground', // Nose gear
  'sim/flightmodel2/gear/on_ground[1]': 'gear1onground', // Main left gear
  'sim/flightmodel2/gear/on_ground[2]': 'gear2onground'  // Right left gear
}

server.on('message', (buffer, remote) => {
  // Buffer includes space characters that aren't handled by trim()
  const type = buffer.slice(9, buffer.length).toString().replace(/\0/g, '')
  const value = buffer.slice(5, 9).readFloatLE(0).toFixed(2)

  const elementId = typeElementIDMap[type] || 'unsupported'

  if (elementId !== 'unsupported') {
    document.getElementById(elementId).innerHTML = value
  }
})

server.bind(PORT, HOST);