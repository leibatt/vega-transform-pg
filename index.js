import { inherits, ingest, Transform } from "vega";
const querystring = require('querystring');
const http = require('http');

/**
 * Queries data from a Postgres database.
 * @constructor
 * @param {object} params - The parameters for this operator.
 */
export default function VegaTransformPostgres(params) {
  Transform.call(this, [], params);
}

VegaTransformPostgres.setHttpOptions = function (httpOptions) {
  if (httpOptions) {
    this._httpOptions = httpOptions;
    return this;
  }
  return this._httpOptions;
}

VegaTransformPostgres.Definition = {
  type: "dbtransform", // FixMe: make uppercase
  metadata: { changes: true, source: true },
  params: [
    { name: "query", type: "string", required: true }
  ]
};

const prototype = inherits(VegaTransformPostgres, Transform);

prototype.transform = async function (params, pulse) {
  // console.log(params)
  if (!VegaTransformPostgres._httpOptions) {
    throw Error("Vega Transform Postgres http options missing. Assign it with setHttpOptions.");
  }
  if (!params.query) {
    throw Error("Internal error: this._query should be defined");
  }

  let result = [];
  const postQuery = async function () {
    const options = VegaTransformPostgres._httpOptions
    const response = await fetch(options.url, {
      method: options.method,
      mode: options.mode,
      headers: options.headers,
      body: querystring.stringify({
        query: params.query
      })
    });

    // fetch won’t reject on HTTP error status even if the response
    // is an HTTP 404 or 500. Instead, it will resolve normally with
    // ok status set to false
    if (response.ok)
      return await response.json();
    else {
      // capture the error message
      const err = await response.json();
      throw Error(
        (err.error + ': ' + err.message).replace(/(\r\n|\n|\r)/gm, "")
      );
    }
  };

  try {
    result = await postQuery();
    // console.log(result)
  } catch (error) {
    console.log(error);
  }

  result.forEach(ingest);
  const out = pulse.fork(pulse.NO_FIELDS & pulse.NO_SOURCE);
  this.value = out.add = out.source = out.rem = result;
  return out;
}
