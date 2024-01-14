function KeyboardInputManager() {
  (this.events = {}),
    window.navigator.msPointerEnabled
      ? ((this.eventTouchstart = "MSPointerDown"),
        (this.eventTouchmove = "MSPointerMove"),
        (this.eventTouchend = "MSPointerUp"))
      : ((this.eventTouchstart = "touchstart"),
        (this.eventTouchmove = "touchmove"),
        (this.eventTouchend = "touchend")),
    this.listen();
}
function HTMLActuator() {
  (this.tileContainer = document.querySelector(".tile-container")),
    (this.scoreContainer = document.querySelector(".score-container")),
    (this.bestContainer = document.querySelector(".best-container")),
    (this.messageContainer = document.querySelector(".game-message")),
    (this.score = 0);
}
function Grid(t, e) {
  (this.size = t), (this.cells = e ? this.fromState(e) : this.empty());
}
function Tile(t, e) {
  (this.x = t.x),
    (this.y = t.y),
    (this.value = e || 2),
    (this.previousPosition = null),
    (this.mergedFrom = null);
}
function LocalStorageManager() {
  (this.bestScoreKey = "bestScore"),
    (this.gameStateKey = "gameState"),
    (this.storage = window.ABStorage);
}
function GameManager(t, e, i, n) {
  (this.size = t),
    (this.inputManager = new e()),
    (this.storageManager = new n()),
    (this.actuator = new i()),
    (this.startTiles = 2),
    this.inputManager.on("move", this.move.bind(this)),
    this.inputManager.on("restart", this.restart.bind(this)),
    this.inputManager.on("keepPlaying", this.keepPlaying.bind(this)),
    this.setup();
}
!(function () {
  var t = document.createElement("div");
  (t.innerHTML =
    '<div class="container" style="margin-top:40px!important;"><div class="above-game"><div class="scores-container"><div class="score-container" style="margin-right: 5px">0</div><div class="best-container">0</div></div><a class="restart-button" style="margin-top: 7px">New Game</a></div><div class="game-container"><div class="game-message"><p></p><div class="lower"><a class="keep-playing-button">Keep going</a><a class="retry-button">Try again</a></div></div><div class="grid-container"><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div><div class="grid-row"><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div><div class="grid-cell"></div></div></div><div class="tile-container"></div></div></div>'),
    document.body.appendChild(t),
    (document.body.style.width = "auto");
})(),
  (Function.prototype.bind =
    Function.prototype.bind ||
    function (t) {
      var e = this;
      return function (i) {
        i instanceof Array || (i = [i]), e.apply(t, i);
      };
    }),
  (function () {
    if (
      void 0 !== window.Element &&
      !("classList" in document.documentElement)
    ) {
      var t,
        e,
        i,
        n = Array.prototype,
        a = n.push,
        r = n.splice,
        o = n.join;
      (s.prototype = {
        add: function (t) {
          this.contains(t) ||
            (a.call(this, t), (this.el.className = this.toString()));
        },
        contains: function (t) {
          return -1 != this.el.className.indexOf(t);
        },
        item: function (t) {
          return this[t] || null;
        },
        remove: function (t) {
          if (this.contains(t)) {
            for (var e = 0; e < this.length && this[e] != t; e++);
            r.call(this, e, 1), (this.el.className = this.toString());
          }
        },
        toString: function () {
          return o.call(this, " ");
        },
        toggle: function (t) {
          return (
            this.contains(t) ? this.remove(t) : this.add(t), this.contains(t)
          );
        },
      }),
        (window.DOMTokenList = s),
        (t = HTMLElement.prototype),
        (e = "classList"),
        (i = function () {
          return new s(this);
        }),
        Object.defineProperty
          ? Object.defineProperty(t, e, { get: i })
          : t.__defineGetter__(e, i);
    }
    function s(t) {
      this.el = t;
      for (
        var e = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0;
        i < e.length;
        i++
      )
        a.call(this, e[i]);
    }
  })(),
  (function () {
    for (
      var t = 0, e = ["webkit", "moz"], i = 0;
      i < e.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[e[i] + "RequestAnimationFrame"]),
        (window.cancelAnimationFrame =
          window[e[i] + "CancelAnimationFrame"] ||
          window[e[i] + "CancelRequestAnimationFrame"]);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function (e) {
        var i = new Date().getTime(),
          n = Math.max(0, 16 - (i - t)),
          a = window.setTimeout(function () {
            e(i + n);
          }, n);
        return (t = i + n), a;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function (t) {
          clearTimeout(t);
        });
  })(),
  (KeyboardInputManager.prototype.on = function (t, e) {
    this.events[t] || (this.events[t] = []), this.events[t].push(e);
  }),
  (KeyboardInputManager.prototype.emit = function (t, e) {
    var i = this.events[t];
    i &&
      i.forEach(function (t) {
        t(e);
      });
  }),
  (KeyboardInputManager.prototype.listen = function () {
    var t,
      e,
      i = this,
      n = {
        38: 0,
        39: 1,
        40: 2,
        37: 3,
        75: 0,
        76: 1,
        74: 2,
        72: 3,
        87: 0,
        68: 1,
        83: 2,
        65: 3,
      };
    document.addEventListener("keydown", function (t) {
      if (!$(t.target).is("input")) {
        var e = t.altKey || t.ctrlKey || t.metaKey || t.shiftKey,
          a = n[t.which];
        e || (void 0 !== a && (t.preventDefault(), i.emit("move", a))),
          e || 82 !== t.which || i.restart.call(i, t);
        var r = document.querySelector(".game-message");
        e ||
          13 !== t.which ||
          (!r.classList.contains("game-won") &&
            !r.classList.contains("game-over")) ||
          i.restart.call(i, t);
      }
    }),
      this.bindButtonPress(".retry-button", this.restart),
      this.bindButtonPress(".restart-button", this.restart),
      this.bindButtonPress(".keep-playing-button", this.keepPlaying);
    var a = document.getElementsByClassName("game-container")[0];
    a.addEventListener(this.eventTouchstart, function (i) {
      (!window.navigator.msPointerEnabled && i.touches.length > 1) ||
        i.targetTouches > 1 ||
        (window.navigator.msPointerEnabled
          ? ((t = i.pageX), (e = i.pageY))
          : ((t = i.touches[0].clientX), (e = i.touches[0].clientY)),
        i.preventDefault());
    }),
      a.addEventListener(this.eventTouchmove, function (t) {
        t.preventDefault();
      }),
      a.addEventListener(this.eventTouchend, function (n) {
        if (
          !(
            (!window.navigator.msPointerEnabled && n.touches.length > 0) ||
            n.targetTouches > 0
          )
        ) {
          var a, r;
          window.navigator.msPointerEnabled
            ? ((a = n.pageX), (r = n.pageY))
            : ((a = n.changedTouches[0].clientX),
              (r = n.changedTouches[0].clientY));
          var o = a - t,
            s = Math.abs(o),
            l = r - e,
            c = Math.abs(l);
          Math.max(s, c) > 10 &&
            i.emit("move", s > c ? (o > 0 ? 1 : 3) : l > 0 ? 2 : 0);
        }
      });
  }),
  (KeyboardInputManager.prototype.restart = function (t) {
    t.preventDefault(), this.emit("restart");
  }),
  (KeyboardInputManager.prototype.keepPlaying = function (t) {
    t.preventDefault(), this.emit("keepPlaying");
  }),
  (KeyboardInputManager.prototype.bindButtonPress = function (t, e) {
    var i = document.querySelector(t);
    i.addEventListener("click", e.bind(this)),
      i.addEventListener(this.eventTouchend, e.bind(this));
  }),
  (HTMLActuator.prototype.actuate = function (t, e) {
    var i = this;
    window.requestAnimationFrame(function () {
      i.clearContainer(i.tileContainer),
        t.cells.forEach(function (t) {
          t.forEach(function (t) {
            t && i.addTile(t);
          });
        }),
        i.updateScore(e.score),
        i.updateBestScore(e.bestScore),
        e.terminated && (e.over ? i.message(!1) : e.won && i.message(!0));
    });
  }),
  (HTMLActuator.prototype.continueGame = function () {
    this.clearMessage();
  }),
  (HTMLActuator.prototype.clearContainer = function (t) {
    for (; t.firstChild; ) t.removeChild(t.firstChild);
  }),
  (HTMLActuator.prototype.addTile = function (t) {
    var e = this,
      i = document.createElement("div"),
      n = document.createElement("div"),
      a = t.previousPosition || { x: t.x, y: t.y },
      r = this.positionClass(a),
      o = ["tile", "tile-" + t.value, r];
    t.value > 2048 && o.push("tile-super"),
      this.applyClasses(i, o),
      n.classList.add("tile-inner"),
      (n.textContent = t.value),
      t.previousPosition
        ? window.requestAnimationFrame(function () {
            (o[2] = e.positionClass({ x: t.x, y: t.y })), e.applyClasses(i, o);
          })
        : t.mergedFrom
        ? (o.push("tile-merged"),
          this.applyClasses(i, o),
          t.mergedFrom.forEach(function (t) {
            e.addTile(t);
          }))
        : (o.push("tile-new"), this.applyClasses(i, o)),
      i.appendChild(n),
      this.tileContainer.appendChild(i);
  }),
  (HTMLActuator.prototype.applyClasses = function (t, e) {
    t.setAttribute("class", e.join(" "));
  }),
  (HTMLActuator.prototype.normalizePosition = function (t) {
    return { x: t.x + 1, y: t.y + 1 };
  }),
  (HTMLActuator.prototype.positionClass = function (t) {
    return "tile-position-" + (t = this.normalizePosition(t)).x + "-" + t.y;
  }),
  (HTMLActuator.prototype.updateScore = function (t) {
    this.clearContainer(this.scoreContainer);
    var e = t - this.score;
    if (
      ((this.score = t), (this.scoreContainer.textContent = this.score), e > 0)
    ) {
      var i = document.createElement("div");
      i.classList.add("score-addition"),
        (i.textContent = "+" + e),
        this.scoreContainer.appendChild(i);
    }
  }),
  (HTMLActuator.prototype.updateBestScore = function (t) {
    this.bestContainer.textContent = t;
  }),
  (HTMLActuator.prototype.message = function (t) {
    var e = t ? "game-won" : "game-over",
      i = t ? "You win!" : "Game over!";
    this.messageContainer.classList.add(e),
      (this.messageContainer.getElementsByTagName("p")[0].textContent = i);
  }),
  (HTMLActuator.prototype.clearMessage = function () {
    this.messageContainer.classList.remove("game-won"),
      this.messageContainer.classList.remove("game-over");
  }),
  (Grid.prototype.empty = function () {
    for (var t = [], e = 0; e < this.size; e++)
      for (var i = (t[e] = []), n = 0; n < this.size; n++) i.push(null);
    return t;
  }),
  (Grid.prototype.fromState = function (t) {
    for (var e = [], i = 0; i < this.size; i++)
      for (var n = (e[i] = []), a = 0; a < this.size; a++) {
        var r = t[i][a];
        n.push(r ? new Tile(r.position, r.value) : null);
      }
    return e;
  }),
  (Grid.prototype.randomAvailableCell = function () {
    var t = this.availableCells();
    if (t.length) return t[Math.floor(Math.random() * t.length)];
  }),
  (Grid.prototype.availableCells = function () {
    var t = [];
    return (
      this.eachCell(function (e, i, n) {
        n || t.push({ x: e, y: i });
      }),
      t
    );
  }),
  (Grid.prototype.eachCell = function (t) {
    for (var e = 0; e < this.size; e++)
      for (var i = 0; i < this.size; i++) t(e, i, this.cells[e][i]);
  }),
  (Grid.prototype.cellsAvailable = function () {
    return !!this.availableCells().length;
  }),
  (Grid.prototype.cellAvailable = function (t) {
    return !this.cellOccupied(t);
  }),
  (Grid.prototype.cellOccupied = function (t) {
    return !!this.cellContent(t);
  }),
  (Grid.prototype.cellContent = function (t) {
    return this.withinBounds(t) ? this.cells[t.x][t.y] : null;
  }),
  (Grid.prototype.insertTile = function (t) {
    this.cells[t.x][t.y] = t;
  }),
  (Grid.prototype.removeTile = function (t) {
    this.cells[t.x][t.y] = null;
  }),
  (Grid.prototype.withinBounds = function (t) {
    return t.x >= 0 && t.x < this.size && t.y >= 0 && t.y < this.size;
  }),
  (Grid.prototype.serialize = function () {
    for (var t = [], e = 0; e < this.size; e++)
      for (var i = (t[e] = []), n = 0; n < this.size; n++)
        i.push(this.cells[e][n] ? this.cells[e][n].serialize() : null);
    return { size: this.size, cells: t };
  }),
  (Tile.prototype.savePosition = function () {
    this.previousPosition = { x: this.x, y: this.y };
  }),
  (Tile.prototype.updatePosition = function (t) {
    (this.x = t.x), (this.y = t.y);
  }),
  (Tile.prototype.serialize = function () {
    return { position: { x: this.x, y: this.y }, value: this.value };
  }),
  (window.fakeStorage = {
    _data: {},
    setItem: function (t, e) {
      return (this._data[t] = String(e));
    },
    getItem: function (t) {
      return this._data.hasOwnProperty(t) ? this._data[t] : void 0;
    },
    removeItem: function (t) {
      return delete this._data[t];
    },
    clear: function () {
      return (this._data = {});
    },
  }),
  (window.ABStorage = {
    setItem: function (t, e) {
      return localStorage.setItem(t, String(e));
    },
    getItem: function (t) {
      return localStorage.getItem(t);
    },
    removeItem: function (t) {
      return localStorage.setItem(t, null);
    },
    clear: function () {},
  }),
  (LocalStorageManager.prototype.localStorageSupported = function () {
    var t = "test",
      e = window.localStorage;
    try {
      return e.setItem(t, "1"), e.removeItem(t), !0;
    } catch (t) {
      return !1;
    }
  }),
  (LocalStorageManager.prototype.getBestScore = function () {
    return this.storage.getItem(this.bestScoreKey) || 0;
  }),
  (LocalStorageManager.prototype.setBestScore = function (t) {
    this.storage.setItem(this.bestScoreKey, t);
  }),
  (LocalStorageManager.prototype.getGameState = function () {
    var t = this.storage.getItem(this.gameStateKey);
    return t ? JSON.parse(t) : null;
  }),
  (LocalStorageManager.prototype.setGameState = function (t) {
    this.storage.setItem(this.gameStateKey, JSON.stringify(t));
  }),
  (LocalStorageManager.prototype.clearGameState = function () {
    this.storage.removeItem(this.gameStateKey);
  }),
  (LocalStorageManager.prototype.isItFirstLaunch = function () {
    return (
      !this.storage.getItem("launched") &&
      (this.storage.setItem("launched", "1"), !0)
    );
  }),
  (GameManager.prototype.restart = function () {
    this.storageManager.clearGameState(),
      this.actuator.continueGame(),
      this.setup();
  }),
  (GameManager.prototype.keepPlaying = function () {
    (this.keepPlaying = !0), this.actuator.continueGame();
  }),
  (GameManager.prototype.isGameTerminated = function () {
    return !!(this.over || (this.won && !this.keepPlaying));
  }),
  (GameManager.prototype.setup = function () {
    var t = this.storageManager.getGameState();
    if (t)
      (this.grid = new Grid(t.grid.size, t.grid.cells)),
        (this.score = t.score),
        (this.over = t.over),
        (this.won = t.won),
        (this.keepPlaying = t.keepPlaying);
    else {
      if (this.storageManager.isItFirstLaunch()) {
        var e = document.createElement("div");
        (e.className = "start-lesson"),
          e.addEventListener("click", function () {
            this.remove();
          }),
          document.addEventListener("keydown", function t() {
            e.remove(), document.removeEventListener("keydown", t);
          }),
          document.body.appendChild(e);
      }
      (this.grid = new Grid(this.size)),
        (this.score = 0),
        (this.over = !1),
        (this.won = !1),
        (this.keepPlaying = !1),
        this.addStartTiles();
    }
    this.actuate();
  }),
  (GameManager.prototype.addStartTiles = function () {
    for (var t = 0; t < this.startTiles; t++) this.addRandomTile();
  }),
  (GameManager.prototype.addRandomTile = function () {
    if (this.grid.cellsAvailable()) {
      var t = Math.random() < 0.9 ? 2 : 4,
        e = new Tile(this.grid.randomAvailableCell(), t);
      this.grid.insertTile(e);
    }
  }),
  (GameManager.prototype.actuate = function () {
    this.storageManager.getBestScore() < this.score &&
      this.storageManager.setBestScore(this.score),
      this.over
        ? this.storageManager.clearGameState()
        : this.storageManager.setGameState(this.serialize()),
      this.actuator.actuate(this.grid, {
        score: this.score,
        over: this.over,
        won: this.won,
        bestScore: this.storageManager.getBestScore(),
        terminated: this.isGameTerminated(),
      });
  }),
  (GameManager.prototype.serialize = function () {
    return {
      grid: this.grid.serialize(),
      score: this.score,
      over: this.over,
      won: this.won,
      keepPlaying: this.keepPlaying,
    };
  }),
  (GameManager.prototype.prepareTiles = function () {
    this.grid.eachCell(function (t, e, i) {
      i && ((i.mergedFrom = null), i.savePosition());
    });
  }),
  (GameManager.prototype.moveTile = function (t, e) {
    (this.grid.cells[t.x][t.y] = null),
      (this.grid.cells[e.x][e.y] = t),
      t.updatePosition(e);
  }),
  (GameManager.prototype.move = function (t) {
    var e = this;
    if (!this.isGameTerminated()) {
      var i,
        n,
        a = this.getVector(t),
        r = this.buildTraversals(a),
        o = !1;
      this.prepareTiles(),
        r.x.forEach(function (t) {
          r.y.forEach(function (r) {
            if (((i = { x: t, y: r }), (n = e.grid.cellContent(i)))) {
              var s = e.findFarthestPosition(i, a),
                l = e.grid.cellContent(s.next);
              if (l && l.value === n.value && !l.mergedFrom) {
                var c = new Tile(s.next, 2 * n.value);
                (c.mergedFrom = [n, l]),
                  e.grid.insertTile(c),
                  e.grid.removeTile(n),
                  n.updatePosition(s.next),
                  (e.score += c.value),
                  2048 === c.value && (e.won = !0);
              } else e.moveTile(n, s.farthest);
              e.positionsEqual(i, n) || (o = !0);
            }
          });
        }),
        o &&
          (this.addRandomTile(),
          this.movesAvailable() || (this.over = !0),
          this.actuate());
    }
  }),
  (GameManager.prototype.getVector = function (t) {
    return {
      0: { x: 0, y: -1 },
      1: { x: 1, y: 0 },
      2: { x: 0, y: 1 },
      3: { x: -1, y: 0 },
    }[t];
  }),
  (GameManager.prototype.buildTraversals = function (t) {
    for (var e = { x: [], y: [] }, i = 0; i < this.size; i++)
      e.x.push(i), e.y.push(i);
    return (
      1 === t.x && (e.x = e.x.reverse()), 1 === t.y && (e.y = e.y.reverse()), e
    );
  }),
  (GameManager.prototype.findFarthestPosition = function (t, e) {
    var i;
    do {
      t = { x: (i = t).x + e.x, y: i.y + e.y };
    } while (this.grid.withinBounds(t) && this.grid.cellAvailable(t));
    return { farthest: i, next: t };
  }),
  (GameManager.prototype.movesAvailable = function () {
    return this.grid.cellsAvailable() || this.tileMatchesAvailable();
  }),
  (GameManager.prototype.tileMatchesAvailable = function () {
    for (var t, e = 0; e < this.size; e++)
      for (var i = 0; i < this.size; i++)
        if ((t = this.grid.cellContent({ x: e, y: i })))
          for (var n = 0; n < 4; n++) {
            var a = this.getVector(n),
              r = { x: e + a.x, y: i + a.y },
              o = this.grid.cellContent(r);
            if (o && o.value === t.value) return !0;
          }
    return !1;
  }),
  (GameManager.prototype.positionsEqual = function (t, e) {
    return t.x === e.x && t.y === e.y;
  }),
  window.requestAnimationFrame(function () {
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  });
