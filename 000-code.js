var express = require("express");

var app = express();
app.use(express.static("public_html"));

var port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
}

app.get("/timenow", function (request, response) {
  var now = new Date();
  console.log("got a TIME request...");
  // stick css here
  response.write("");

  response.write("<h1><em>Welcome to SIT725!</em></h1>");
  response.write("<p>Today is <strong>" + now + "</strong></p>");
  response.write(
    "<p><em>Date and Time NOW was served dynamically from the express server.</em></p>"
  );

  response.send();
});

app.get("/randomnow", function (request, response) {
  var nowRandom = 100 * Math.random();
  console.log("got a RANDOM request...");
  // stick css here
  response.write("");

  response.write("<h1><em>Welcome to SIT725!</em></h1>");
  response.write("<p>Random number is: <strong>" + nowRandom + "</strong></p>");
  response.write(
    "<p><em>Random Number was served dynamically from the express server. Refresh the window for the <strong>next Random Number</strong></em></p>"
  );

  response.send();
});

app.get("/powertable", function (request, response) {
  var powerBase = 2;
  var upTo = 65;

  console.log("got a powertable base 2 request...");
  var output_text = powerTableBuilder(powerBase, upTo);
  response.write(output_text);
  response.send();
});

app.get("/:powerFunction/:basePower", function (request, response) {
  console.log(request.params["powerFunction"]);
  console.log(parseInt(request.params["basePower"]));

  if (
    request.params["powerFunction"] == "powertable" &&
    !isNaN(parseInt(request.params["basePower"]))
  ) {
    console.log("got a powertable for 12 rows request...");
    console.log(
      request.params["powerFunction"] == "powertable" &&
        !isNaN(parseInt(request.params["basePower"]))
    );

    var powerBase = parseInt(request.params["basePower"]);
    var upTo = 12;
    var output_text = powerTableBuilder(powerBase, upTo);
    response.write(output_text);
    response.send();
  } else {
    response.write(elseIfNaNDisplay());
    response.send();
  }
});

app.get(
  "/:powerFunction/:basePower/:IterationNumber",
  function (request, response) {
    console.log(request.params["powerFunction"]);
    console.log(parseInt(request.params["basePower"]));
    console.log(parseInt(request.params["IterationNumber"]));
    console.log(
      parseInt(request.params["basePower"]) +
        parseInt(request.params["IterationNumber"])
    );

    if (
      request.params["powerFunction"] == "powertable" &&
      !isNaN(parseInt(request.params["basePower"])) &&
      !isNaN(parseInt(request.params["IterationNumber"]))
    ) {
      console.log("got a powertable request...");
      console.log(
        request.params["powerFunction"] == "powertable" &&
          !isNaN(parseInt(request.params["basePower"])) &&
          !isNaN(parseInt(request.params["IterationNumber"]))
      );

      var powerBase = parseInt(request.params["basePower"]);
      var upTo = parseInt(request.params["IterationNumber"]);
      var outputText;
      var output_text = powerTableBuilder(powerBase, upTo);
      response.write(output_text);
      response.send();
    } else {
      response.write(elseIfNaNDisplay());
      response.send();
    }
  }
);

function powerTableBuilder(base, rows) {
  var outputText;
  outputText =
    '<!DOCTYPE html><html lang="en"><head><style> #wrapper {width: 90%;margin-left: auto;margin-right: auto;} table, td, th {border: 1px solid #ddd;}table { border-collapse: collapse; width: 40%; text-align: center;}th { height: 50px;} tr { height: 40px;}</style></head><body><div id=wrapper>';
  outputText += "<h1><em>Table of Power Values</em></h1>";
  outputText +=
    "<p>The following table has been created dynamically in the express server and contains the values <br> for <strong>" +
    base +
    " ^ " +
    (rows - 1) +
    "</strong> (for n = 0 to  " +
    (rows - 1) +
    ")</p>";

  outputText += '<table class="table">  <caption>Power  Table</caption>';
  outputText += "<tr><th>Index</th><th>Value</th></tr>";

  for (var row = 0; row < rows; row++) {
    outputText +=
      "<tr><td>" +
      base +
      " ^ " +
      row +
      "</td><td> " +
      Math.pow(base, row) +
      " </td></tr>";
  }

  outputText += "</table></div></body></html>";
  return outputText;
}

function elseIfNaNDisplay() {
  var outputText =
    '<!DOCTYPE html><html lang="en"><head></head><body><div><h1>Hello!</h1><p style="font-size:100px">&#128540;</p></div></body></html>';
  return outputText;
}

// http://localhost:3000  (3000, 80, 443)
app.listen(port, function () {
  console.log(`Web server running at: http://localhost:${port}`);
  console.log("Type Ctrl+C to shut down the web server");
});
