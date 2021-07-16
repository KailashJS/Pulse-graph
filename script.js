(function() {

    var ECGPulse = function() {
      // this function is strict...
      this.demo = document.getElementById('demo');
      this.ctx = this.demo.getContext('2d');
      this.w = this.demo.getBoundingClientRect().width;
      this.h = this.demo.getBoundingClientRect().height;
      this.px = 0;
      this.opx = 0;
      this.py = this.h / 2;
      this.opy = this.py;
      this.speed = 0.5;
      this.scanBarWidth = 20;
      this.frame = null;

      this.demo.width = this.w;
      this.demo.height = this.h;

      this.ctx.strokeStyle = '#000000';
      this.ctx.lineWidth = 0.5;


      this.loop = function() {
        this.px += this.speed;
// console.log(this);
        this.ctx.clearRect(this.px, 0, this.scanBarWidth, this.h);

        this.ctx.beginPath();
        this.ctx.moveTo(this.opx, this.opy);
        this.ctx.lineTo(this.px, this.py);
        this.ctx.stroke();

        for (var i = 1; i < 5; i++) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.opx, this.opy - 100 * i);
          this.ctx.lineTo(this.px, this.py - 100 * i);
          this.ctx.stroke();

          this.ctx.beginPath();
          this.ctx.moveTo(this.opx, this.opy + 100 * i);
          this.ctx.lineTo(this.px, this.py + 100 * i);
          this.ctx.stroke();
        }

        this.opx = this.px;
        this.opy = this.py;

        if (this.opx > this.w) {
          this.px = this.opx = -this.speed;
          // console.log('opx > w');
//           window.cancelAnimationFrame(this.frame);
//           return;
        }

        this.frame = requestAnimationFrame(this.loop.bind(this));
      };

      this.frame = requestAnimationFrame(this.loop.bind(this));

      this.demo.onmousemove = function(e) {
        var r = this.demo.getBoundingClientRect();
        this.py += e.movementY - r.top;
        // py = e.clientY - r.top;
      }.bind(this);

      this.demo.onclick = function(e) {
        console.log(this.frame);
        window.cancelAnimationFrame(this.frame);
      }.bind(this);
    };

    var ecg = new ECGPulse();
    var gui = new dat.GUI();
    gui.add(ecg, 'speed', 0.1, 5);



  }());