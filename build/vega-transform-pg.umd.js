!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("vega")):"function"==typeof define&&define.amd?define(["vega"],e):t.VegaTransformPostgres=e(t.vega)}(this,function(t){var e=require("querystring"),r=require("http");function n(e){t.Transform.call(this,[],e)}return n.setHttpOptions=function(t){return t?(this._httpOptions=t,this):this._httpOptions},n.Definition={type:"postgres",metadata:{changes:!0,source:!0},params:[{name:"relation",type:"string",required:!0}]},t.inherits(n,t.Transform).transform=function(o,i){try{var s=this;if(!n._httpOptions)throw Error("Vega Transform Postgres http options missing. Assign it with setHttpOptions.");if(!s._query)throw Error("Internal error: this._query should be defined");return Promise.resolve(new Promise(function(t,o){var i=e.stringify({query:s._query});n._httpOptions["Content-Length"]=Buffer.byteLength(i);var u=r.request(n._httpOptions,function(e){var r="";e.on("data",function(t){r+=t}),e.on("end",function(){400===e.statusCode?o(e.statusMessage+": "+r):t(JSON.parse(r))})});u.on("error",function(t){o(t)}),u.write(i),u.end()}).catch(function(t){return console.error(t),[]})).then(function(e){e.forEach(t.ingest);var r=i.fork(i.NO_FIELDS&i.NO_SOURCE);return s.value=r.add=r.source=r.rem=e,r})}catch(t){return Promise.reject(t)}},n});
//# sourceMappingURL=vega-transform-pg.umd.js.map
