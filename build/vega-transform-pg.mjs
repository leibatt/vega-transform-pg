import{inherits as t,ingest as r,Transform as e}from"vega";var n=require("querystring"),o=require("http");function i(t){e.call(this,[],t)}i.setHttpOptions=function(t){return t?(this._httpOptions=t,this):this._httpOptions},i.Definition={type:"postgres",metadata:{changes:!0,source:!0},params:[{name:"relation",type:"string",required:!0}]},t(i,e).transform=function(t,e){try{var s=this;if(!i._httpOptions)throw Error("Vega Transform Postgres http options missing. Assign it with setHttpOptions.");if(!s._query)throw Error("Internal error: this._query should be defined");return Promise.resolve(new Promise(function(t,r){var e=n.stringify({query:s._query});i._httpOptions["Content-Length"]=Buffer.byteLength(e);var a=o.request(i._httpOptions,function(e){var n="";e.on("data",function(t){n+=t}),e.on("end",function(){400===e.statusCode?r(e.statusMessage+": "+n):t(JSON.parse(n).rows)})});a.on("error",function(t){r(t)}),a.write(e),a.end()}).catch(function(t){return console.error(t),[]})).then(function(t){t.forEach(r);var n=e.fork(e.NO_FIELDS&e.NO_SOURCE);return s.value=n.add=n.source=n.rem=t,n})}catch(t){return Promise.reject(t)}};export default i;
//# sourceMappingURL=vega-transform-pg.mjs.map
