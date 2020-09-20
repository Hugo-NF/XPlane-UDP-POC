const PORT = 49000

const dgram = require('dgram');
const server = dgram.createSocket('udp4')


const typeElementIDMap = {
  'sim/cockpit2/gauges/indicators/altitude_ft_pilot': 'altitude',
  'sim/cockpit2/gauges/indicators/airspeed_kts_pilot': 'airspeed',
  'sim/cockpit2/gauges/indicators/heading_vacuum_deg_mag_pilot': 'heading',
  'sim/flightmodel/position/vh_ind_fpm': 'vertairspeed',
  'sim/cockpit2/engine/indicators/engine_speed_rpm[0]': 'rpm',
  'sim/cockpit2/gauges/indicators/slip_deg': 'ball',
  'sim/cockpit2/gauges/indicators/turn_rate_heading_deg_pilot': 'bankindicator',
  'sim/cockpit/misc/ah_adjust': 'artha',
  'sim/cockpit2/gauges/indicators/pitch_AHARS_deg_pilot': 'arthp',
  'sim/cockpit2/gauges/indicators/roll_AHARS_deg_pilot': 'arthr'
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

server.bind(PORT);