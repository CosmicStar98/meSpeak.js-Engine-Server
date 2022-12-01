  // ========================================================================
// Server init
// ========================================================================

// Filesystem reading functions
const fs = require('fs');

// Setup basic express server
var express = require('express');
var app = express();
var http = require("http");
const url = require('url');
var server = require('http').createServer(app, console.log());
app.use(express.static('./', {
  extensions: ['html']
}));
var meSpeak = require("mespeak")
meSpeak.loadConfig(require("mespeak/src/mespeak_config.json"))
meSpeak.loadVoice(require("mespeak/voices/en/en-us.json"))
console.log = function() { };
server.listenerCount(1);
// Start actually listening
server.listen(process.env.PORT || 5000);
app.get('/', function(req, res) {
  if (req.query) {
    if (req.query.text && req.query.pitch && req.query.speed) {
      const text = req.query.text.replaceAll("[[", "").replaceAll("]]", "").replaceAll("- ", "minus ").replaceAll("%", "percent ").replaceAll("bonzi", "Bahnzi ")
      var data = meSpeak.speak(text, { pitch: req.query.pitch, speed: req.query.speed, rawdata: "buffer" });

      fs.writeFileSync("test.wav", data);
      const stream = fs.createReadStream('test.wav')
      stream.pipe(res)
    } else {
      res.send('Missing parameters!\nThe parameters are: text, pitch, speed')
    }
  } else {
    res.send("Hello World")
  }
  return res.writeHead(200, {
    'Content-Type': 'audio/wav'
  });
})

var https = require("https");
var axios = require("axios");

// fuck you xomdjl_
// in all seriousness credit goes to wrapper offline devs
app.get("/eric", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/american/3-male-voice-eric.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }

                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/jennifer", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/american/28-female-voice-jennifer.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/brian", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/british/1-male-voice-brian.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/brian", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/british/1-male-voice-brian.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/"); 
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/karl", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/icelandic/31-male-rodd-karl.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/joey", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/american/29-male-voice-joey.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/mads", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/danish/37-mandlig-stemme-mads.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/sally", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/american/2-girl-s-voice-sally.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/ivy", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/american/25-child-s-girl-voice-ivy.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/russell", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/australian/48-male-voice-russell.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/justin", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/english/american/30-child-s-boy-voice-justin.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/ricardo", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          const request = https.request(
              {
                  host: "readloud.net",
                  port: 443,
                  path: "/portuguese/brasilian/46-voz-masculina-ricardo.html",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                  },
              },
              (r) => {
                  var buffers = [];
                  r.on("data", (d) => buffers.push(d));
                  r.on("end", () => {
                      const html = Buffer.concat(buffers);
                      const beg = html.indexOf("/tmp/");
                      const end = html.indexOf(".mp3", beg) + 4;
                      const sub = html.subarray(beg, end).toString();

                      https.get(
                          {
                              host: "readloud.net",
                              path: sub,
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                                  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Safari/537.36",
                              },
                          },
                          (r) => {
                              buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", async () => {
                
                  try {
                  const url = "http://readloud.net/" + sub;
                  const response = await axios({
                    url,
                    method: "GET",
                    responseType: "stream",
                  });
                  response.data.pipe(res);
                } catch(e) {
                  console.error(e)
                }
                
                              })
                          }
                      );
                  });
                  r.on("error", function (e) {
                      console.log(e);
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  but1: text,
                  butS: 0,
                  butP: 0,
                  butPauses: 0,
                  but: "Submit",
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/damien", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
            https.get('https://www.cepstral.com/en/demos', r => {
                const cookie = r.headers['set-cookie'];
                var q = new URLSearchParams({
                    voiceText: text,
                    voice: "Damien",
                    createTime: 666,
                    rate: 170,
                    pitch: 1,
                    sfx: 'none',
                }).toString();
                var buffers = [];
                var request = https.get({
                    host: 'www.cepstral.com',
                    path: `/demos/createAudio.php?${q}`,
                    headers: { Cookie: cookie },
                    method: 'GET',
                }, r => {
                    r.on('data', b => buffers.push(b));
                    r.on('end', async () => {
                        var json = JSON.parse(Buffer.concat(buffers));
                        const url = `https://www.cepstral.com${json.mp3_loc}`
                        const response = await axios({
                            url,
                            method: "GET",
                            responseType: "stream",
                        });
                        response.data.pipe(res);
                    })
                });
            });
          return res.writeHead(200, {
            'Content-Type': 'audio/mp3'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});
app.get("/willfromafar", async function (req, res) {
  if (req.query) {
      if (req.query.text) {
          const text = req.query.text;
          var buffers = [];
          var acapelaArray = [];
          for (var c = 0; c < 15; c++) acapelaArray.push(~~(65 + Math.random() * 26));
          var email = `${String.fromCharCode.apply(null, acapelaArray)}@gmail.com`;
          var request = https.request(
              {
                  hostname: "acapelavoices.acapela-group.com",
                  path: "/index/getnonce",
                  method: "POST",
                  headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                  },
              },
              (r) => {
                  r.on("data", (b) => buffers.push(b));
                  r.on("end", () => {
                      var nonce = JSON.parse(Buffer.concat(buffers)).nonce;
                      var request2 = http.request(
                          {
                              hostname: "acapela-group.com",
                              port: "8080",
                              path: "/webservices/1-34-01-Mobility/Synthesizer",
                              method: "POST",
                              headers: {
                                  "Content-Type": "application/x-www-form-urlencoded",
                              },
                          },
                          (r) => {
                              var buffers = [];
                              r.on("data", (d) => buffers.push(d));
                              r.on("end", () => {
                                  const html = Buffer.concat(buffers);
                                  const beg = html.indexOf("&snd_url=") + 9;
                                  const end = html.indexOf("&", beg);
                                  const sub = html.subarray(beg, end).toString();
                                  http.get(sub, (r) => {
                                      r.on("data", (d) => buffers.push(d));
                                      r.on("end", async () => {
                                            const url = sub
                                            const response = await axios({
                                                url,
                                                method: "GET",
                                                responseType: "stream",
                                            });
                                            response.data.pipe(res);
                                      });
                                  });
                              });
                              r.on("error", function(error){
                                console.log(error)
                              });
                          }
                      );
                      request2.end(
                          new URLSearchParams({
                              req_voice:"enu_willfromafar_22k_ns.bvcu",
                              cl_pwd: "",
                              cl_vers: "1-30",
                              req_echo: "ON",
                              cl_login: "AcapelaGroup",
                              req_comment: `{"nonce":"${nonce}","user":"${email}"}`,
                              req_text: text,
                              cl_env: "ACAPELA_VOICES",
                              prot_vers: 2,
                              cl_app: "AcapelaGroup_WebDemo_Android",
                          }).toString()
                      );
                  });
              }
          );
          request.end(
              new URLSearchParams({
                  json: `{"googleid":"${email}"`,
              }).toString()
          );
          return res.writeHead(200, {
            'Content-Type': 'audio/wav'
          });
      } else {
          res.send("Missing parameters!\nThe parameters are: text");
      }
  }
});