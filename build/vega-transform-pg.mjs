import{inherits as r,ingest as t,Transform as e}from"vega";var n=require("querystring"),o=require("http");function i(r){e.call(this,[],r)}i.setHttpOptions=function(r){return r?(this._options=r,this):this._options},i.Definition={type:"postgres",metadata:{changes:!0,source:!0},params:[{name:"query",type:"string",required:!0}]},r(i,e).transform=function(r,e){try{var s=this;if(!i._options)throw Error("Vega Transform Postgres query missing. Assign it with setQuery.");return Promise.resolve(new Promise(function(t,e){var s=n.stringify({query:r.query});i._options["Content-Length"]=Buffer.byteLength(s);var u=o.request(i._options,function(r){var e="";r.on("data",function(r){e+=r}),r.on("end",function(){t(JSON.parse(e).rows)})});u.on("error",function(r){console.error("Error: "+r),e()}),u.write(s),u.end()})).then(function(r){r.forEach(t);var n=e.fork(e.NO_FIELDS&e.NO_SOURCE);return n.rem=s.value,s.value=n.add=n.source=r,n})}catch(r){return Promise.reject(r)}};export default i;
//# sourceMappingURL=vega-transform-pg.mjs.map
