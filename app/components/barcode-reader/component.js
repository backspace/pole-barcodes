import Component from '@glimmer/component';
import { action } from '@ember/object';

import Quagga from 'quagga';

export default class BarcodeReader extends Component {

  @action
  requestCamera() {
    let state = {
      inputStream: {
          type : "LiveStream",
          constraints: {
              width: {min: 640},
              height: {min: 480},
              aspectRatio: {min: 1, max: 100},
              facingMode: "environment" // or user
          }
      },
      locator: {
          patchSize: "medium",
          halfSample: true
      },
      numOfWorkers: 2,
      frequency: 10,
      decoder: {
          readers : [{
              format: "code_39_reader",
              config: {}
          }]
      },
      locate: true
    };

    Quagga.init(
      state,
      (err) => {
        if (err) {
          this.error = err;
          return;
        }

        Quagga.start();
      }
    )

    Quagga.onDetected((result) => {
      this.args.onBarcodeRead(result.codeResult.code);
    });
  }
}


Quagga.onProcessed(function(result) {
  var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

  if (result) {
      if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
              return box !== result.box;
          }).forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
          });
      }

      if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
      }

      if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
      }
  }
});
