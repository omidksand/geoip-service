const path = require('path');
const Reader = require('@maxmind/geoip2-node').Reader;

class MaxMindGeoLiteV2 {

   constructor() {
      this._init();
   }

   async _init() {
      let dbDir = path.resolve(process.cwd(), 'db'),
         loadDbFile = async (dbFile) => {
            return await Reader.open(path.resolve(dbDir, dbFile));
         };

      this.cityReader = await loadDbFile('GeoLite2-City.mmdb');

      // this.cityReader = await loadDbFile('GeoLite2-Country.mmdb');
      // const response = reader.country(IP_ADDRESS);

      // this.cityReader = await loadDbFile('GeoLite2-ASN.mmdb');
      // const response = reader.asn(IP_ADDRESS);
   }

   _getSubdivision(data) {
      let result = [],
         obj;

      for (let sub in data) {
         obj = data[sub];
         result.push({
            name: obj.names.en,
            isoCode: obj.isoCode,
         });
      }

      return result;
   }

   findIpLocation(ipAddress) {
      let searchResult,
         result;

      try {
         searchResult = this.cityReader.city(ipAddress);

         result = searchResult ? {
            countryName: searchResult.country.names.en,
            countryCode: searchResult.country.isoCode,
            cityName: searchResult.city.names.en,
            postalCode: searchResult.postal ? searchResult.postal.code : null,
            location: searchResult.location,
            subdivision: this._getSubdivision(searchResult.subdivisions || {}),
         } : null;

      } catch (error) {
         console.log(`Err: ${error.message}`);
         result = null;
      }
      return result;
   }
}

module.exports = new MaxMindGeoLiteV2();